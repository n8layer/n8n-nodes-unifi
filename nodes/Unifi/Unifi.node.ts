import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
	IHttpRequestOptions,
} from 'n8n-workflow';

import { siteOperations, siteFields } from './descriptions/SiteDescription';
import { deviceOperations, deviceFields } from './descriptions/DeviceDescription';
import { clientFields, clientOperations } from './descriptions/ClientDescription';
import { networkOperations, networkFields } from './descriptions/NetworkDescription';
import { internetAccessControlOperations, internetAccessControlFields } from './descriptions/InternetAccessControlDescription';
import { sitesAndMonitoringFields, sitesAndMonitoringOperations } from './descriptions/SitesAndMonitoringDescription';

export class Unifi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Unifi',
		name: 'unifi',
		icon: 'file:Unifi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Unifi API',
		defaults: {
			name: 'Unifi',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'unifiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.serverUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Client',
						value: 'client',
					},
					{
						name: 'Device',
						value: 'device',
					},
					{
						name: 'Internet Access Control',
						value: 'internetAccessControl',
					},
					{
						name: 'Network',
						value: 'network',
					},
					{
						name: 'Site',
						value: 'site',
					},
					{
						name: 'Sites and Monitoring',
						value: 'sitesAndMonitoring',
					},
				],
				default: 'site',
			},
		// Operation
		...siteOperations,
		...siteFields,
		...deviceOperations,
		...deviceFields,
		...clientOperations,
		...clientFields,
		...networkOperations,
		...networkFields,
		...internetAccessControlOperations,
		...internetAccessControlFields,
		...sitesAndMonitoringOperations,
		...sitesAndMonitoringFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Get credentials
		const credentials = await this.getCredentials('unifiApi');
		if (!credentials?.username || !credentials?.password) {
			throw new NodeOperationError(this.getNode(), 'Missing username or password in credentials');
		}

		const serverUrl = (credentials.serverUrl as string) || 'https://unifi.elasticit.com:8443/v2/api';
		const baseServerUrl = serverUrl.replace('/v2/api', ''); // Extract base URL for login

		// Authenticate once per execution (not per item)
		let sessionCookie = '';
		try {
			const loginOptions: IHttpRequestOptions = {
				url: `${baseServerUrl}/api/login`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: {
					username: credentials.username,
					password: credentials.password,
				},
				returnFullResponse: true,
			};

			const loginResponse = await this.helpers.httpRequest(loginOptions);

			// Extract session cookie from login response
			if (loginResponse.headers && loginResponse.headers['set-cookie']) {
				const cookies = loginResponse.headers['set-cookie'];
				sessionCookie = Array.isArray(cookies)
					? cookies.map(cookie => cookie.split(';')[0]).join('; ')
					: cookies.split(';')[0];
			}

			if (!sessionCookie) {
				throw new NodeOperationError(
					this.getNode(),
					'Authentication failed - no session cookie received'
				);
			}
		} catch (error) {
			throw new NodeOperationError(
				this.getNode(),
				'Authentication failed. Please check your credentials and server URL.'
			);
		}

		// Process each input item
		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				// Build request based on operation (this mirrors the routing configs)
				let requestOptions: IHttpRequestOptions = {
					url: serverUrl,
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Cookie': sessionCookie,
					},
					body: {},
				};

				// Get routing configuration from description files
				const routingConfig = Unifi.getOperationRouting(resource, operation, i, this);
				if (routingConfig) {
					// Check if URL starts with /api/ (Controller API) vs v2 API
					let fullUrl = `${serverUrl}${routingConfig.url}`;
					if (routingConfig.url.startsWith('/api/')) {
						// Use base server URL (without /v2/api) for Controller API endpoints
						fullUrl = `${baseServerUrl}${routingConfig.url}`;
					}

					requestOptions = {
						...requestOptions,
						url: fullUrl,
						method: routingConfig.method,
						body: routingConfig.body || {},
					};
				}

			// Execute the API request
			const responseData = await this.helpers.httpRequest(requestOptions);

			// Handle response based on resource and operation
			let processedData = responseData;

			// For device operations with splitIntoItems enabled, extract data array
			if (resource === 'device' && ['listAllDevices', 'getDeviceInfo', 'getDeviceStats'].includes(operation)) {
				const splitIntoItems = this.getNodeParameter('splitIntoItems', i, true) as boolean;
				if (splitIntoItems && responseData.data && Array.isArray(responseData.data)) {
					// Split each device into its own item
					returnData.push(...responseData.data.map((device: any) => ({ json: device })));
					continue; // Skip the default handling below
				}
			}

			// For client operations with splitIntoItems enabled, extract data array
			if (resource === 'client' && ['listActiveClients', 'listAllClients', 'getClientDetails'].includes(operation)) {
				const splitIntoItems = this.getNodeParameter('splitIntoItems', i, true) as boolean;
				if (splitIntoItems && responseData.data && Array.isArray(responseData.data)) {
					// Split each client into its own item
					returnData.push(...responseData.data.map((client: any) => ({ json: client })));
					continue; // Skip the default handling below
				}
			}

			{
				if (resource === 'network' && ['listNetworks'].includes(operation)) {
					const splitIntoItems = this.getNodeParameter('splitIntoItems', i, true) as boolean;
					if (splitIntoItems && responseData.data && Array.isArray(responseData.data)) {
						// Split each network into its own item
						returnData.push(...responseData.data.map((network: any) => ({ json: network })));
						continue; // Skip the default handling below
					}
				}
			}
			// For site operations with splitIntoItems enabled, extract data array
			if (resource === 'site' && ['getMany', 'getSiteHealth'].includes(operation)) {
				const splitIntoItems = this.getNodeParameter('splitIntoItems', i, true) as boolean;
				if (splitIntoItems && responseData.data && Array.isArray(responseData.data)) {
					// Split each site into its own item
					returnData.push(...responseData.data.map((site: any) => ({ json: site })));
					continue; // Skip the default handling below
				}
			}
			// Default handling for other operations or when splitIntoItems is false
			if (Array.isArray(processedData)) {
				returnData.push(...processedData.map(item => ({ json: item })));
			} else {
				returnData.push({ json: processedData });
			}

			} catch (error) {
				// Handle API errors
				if (error.response?.status === 401) {
					throw new NodeOperationError(
						this.getNode(),
						'Authentication failed. Please check your username and password.',
						{ itemIndex: i }
					);
				}

				if (error.response?.status === 403) {
					throw new NodeOperationError(
						this.getNode(),
						'Access forbidden. Check your credentials and permissions.',
						{ itemIndex: i }
					);
				}

				// Generic error handling
				const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
				throw new NodeOperationError(
					this.getNode(),
					`UniFi API Error: ${errorMessage}`,
					{ itemIndex: i }
				);
			}
		}

		return [returnData];
	}

	private static getOperationRouting(resource: string, operation: string, itemIndex: number, context: IExecuteFunctions): any {
		// Find the operation configuration from the description files
		let operationConfig: any = null;

	// Map resources to their operation definitions
	const resourceOperations: { [key: string]: any[] } = {
		site: siteOperations,
		device: deviceOperations,
		client: clientOperations,
		network: networkOperations,
		internetAccessControl: internetAccessControlOperations,
		sitesAndMonitoring: sitesAndMonitoringOperations,
	};

		const operations = resourceOperations[resource];
		if (operations && operations.length > 0) {
			// Find the operation property definition (should be the first item)
			const operationProperty = operations[0];
			operationConfig = operationProperty.options?.find((op: any) => op.value === operation);
		}

		if (!operationConfig?.routing) {
			return null;
		}

		// Process the routing configuration and resolve parameters
		const routing = operationConfig.routing.request;
		const processedRouting = {
			method: routing.method,
			url: Unifi.processUrl(routing.url, itemIndex, context),
			body: Unifi.processBody(routing.body, itemIndex, context),
		};

		return processedRouting;
	}

	private static processUrl(url: string, itemIndex: number, context: IExecuteFunctions): string {
		if (!url) return '';

		// Handle expression syntax like '=/site/{{ $parameter.siteId }}/radius/users'
		if (url.startsWith('=')) {
			url = url.substring(1); // Remove the '=' prefix
		}

		// Replace parameter expressions
		return url.replace(/\{\{\s*\$parameter\.(\w+)\s*\}\}/g, (match, paramName) => {
			return context.getNodeParameter(paramName, itemIndex, '') as string;
		});
	}

	private static processBody(body: any, itemIndex: number, context: IExecuteFunctions): any {
		if (!body) return body;

		// Handle arrays
		if (Array.isArray(body)) {
			return body.map(item => Unifi.processBody(item, itemIndex, context));
		}

		// Handle objects
		if (typeof body === 'object') {
			const processedBody: any = {};

			for (const [key, value] of Object.entries(body)) {
				if (typeof value === 'string' && value.startsWith('={{')) {
					// Handle expression syntax like '={{ $parameter.searchText || "" }}'
					const expression = value.substring(3, value.length - 2).trim(); // Remove '={{' and '}}'

					// Extract parameter name and default value
					const paramMatch = expression.match(/\$parameter\.(\w+)(?:\s*\|\|\s*(?:"([^"]*)"|(\d+)))?/);
					if (paramMatch) {
						const paramName = paramMatch[1];
						const defaultValue = paramMatch[2] || paramMatch[3] || '';
						processedBody[key] = context.getNodeParameter(paramName, itemIndex, defaultValue);
					}
				} else if (typeof value === 'object') {
					// Recursively process nested objects/arrays
					processedBody[key] = Unifi.processBody(value, itemIndex, context);
				} else {
					processedBody[key] = value;
				}
			}

			return processedBody;
		}

		// Return primitive values as-is
		return body;
	}

}
