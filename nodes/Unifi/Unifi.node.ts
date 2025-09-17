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
import { deploymentTokenOperations, deploymentTokenFields } from './descriptions/DeploymentTokenDescription';
import { groupFields, groupOperations } from './descriptions/GroupDescription';
import { policyOperations, policyFields } from './descriptions/PolicyDescription';
import { unblockRequestFields, unblockRequestOperations } from './descriptions/UnblockRequestDescription';
import { endpointFields, endpointOperations } from './descriptions/EndpointDescription';

export class Unifi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Unifi',
		name: 'unifi',
		// icon: 'file:Unifi.svg',
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
			baseURL: '',  // Will be set dynamically from credentials
			url: '',
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
						name: 'Site',
						value: 'site',
					},
					{
						name: 'Deployment Token',
						value: 'deploymentToken',
					},
					{
						name: 'Endpoint',
						value: 'endpoint',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Policy',
						value: 'policy',
					},
					{
						name: 'Unblock Request',
						value: 'unblockRequest',
					},
				],
				default: 'site',
			},
			// Operation
			...siteOperations,
			...siteFields,
			...deploymentTokenOperations,
			...deploymentTokenFields,
			...groupOperations,
			...groupFields,
			...policyOperations,
			...policyFields,
			...unblockRequestOperations,
			...unblockRequestFields,
			...endpointOperations,
			...endpointFields,
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

		for (let i = 0; i < items.length; i++) {
			try {
				// Step 1: Login to get session cookie (like in your HTTP Request screenshots)
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
				let sessionCookie = '';
				if (loginResponse.headers && loginResponse.headers['set-cookie']) {
					const cookies = loginResponse.headers['set-cookie'];
					sessionCookie = Array.isArray(cookies)
						? cookies.map(cookie => cookie.split(';')[0]).join('; ')
						: cookies.split(';')[0];
				}

				if (!sessionCookie) {
					throw new NodeOperationError(
						this.getNode(),
						'Authentication failed - no session cookie received',
						{ itemIndex: i }
					);
				}

				// Step 2: Use the routing from descriptions to make the actual API call
				// Get the routing configuration for this operation
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				// Build the request using the routing configuration from descriptions
				let requestOptions: IHttpRequestOptions = {
					url: serverUrl,
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Cookie': sessionCookie,
					},
				};

				// Apply routing configuration based on the operation
				// This would normally be handled by n8n's routing system,
				// but since we need custom authentication, we'll do it manually
				const routingData = getRoutingData(resource, operation, this, i);
				if (routingData) {
					requestOptions = {
						...requestOptions,
						...routingData,
						url: `${serverUrl}${routingData.url}`,
						headers: {
							...requestOptions.headers,
							...routingData.headers,
						},
					};
				}

				// Step 3: Execute the actual API request with session cookie
				const responseData = await this.helpers.httpRequest(requestOptions);

				// Handle response
				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map(item => ({ json: item })));
				} else {
					returnData.push({ json: responseData });
				}

			} catch (error) {
				// Handle authentication errors
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

}

// Helper function to extract routing information from descriptions
function getRoutingData(resource: string, operation: string, context: IExecuteFunctions, itemIndex: number): any {
	// This is a simplified version - in a full implementation, you'd parse the routing
	// from your description files based on the resource and operation

	// For customer operations example
	if (resource === 'customer' && operation === 'getMany') {
		return {
			method: 'POST',
			url: '/customers/search',
			body: {
				page: context.getNodeParameter('page', itemIndex, 1),
				pageSize: context.getNodeParameter('pageSize', itemIndex, 10),
				sortProperty: context.getNodeParameter('sortProperty', itemIndex, undefined),
				sortAscending: context.getNodeParameter('sortAscending', itemIndex, true),
				nameContains: context.getNodeParameter('nameContains', itemIndex, undefined),
				isEnabled: context.getNodeParameter('isEnabled', itemIndex, true),
				uuidEquals: context.getNodeParameter('uuidEquals', itemIndex, undefined),
				createdAfter: context.getNodeParameter('createdAfter', itemIndex, undefined),
				createdBefore: context.getNodeParameter('createdBefore', itemIndex, undefined),
			},
		};
	}

	if (resource === 'customer' && operation === 'create') {
		return {
			method: 'POST',
			url: '/customers',
			body: {
				name: context.getNodeParameter('name', itemIndex),
				basePolicyUuid: context.getNodeParameter('basePolicyUuid', itemIndex),
			},
		};
	}

	if (resource === 'site' && operation === 'getMany') {
		return {
			method: 'POST',
			url: '/sites/overview',
			body: {
				searchText: context.getNodeParameter('searchText', itemIndex, ''),
				sortByField: context.getNodeParameter('sortByField', itemIndex, 'description'),
				sortDirection: context.getNodeParameter('sortDirection', itemIndex, 'ASCENDING'),
				pageSize: context.getNodeParameter('pageSize', itemIndex, 100),
				pageNumber: context.getNodeParameter('pageNumber', itemIndex, 0),
			},
		};
	}

	if (resource === 'site' && operation === 'getRadiusUsers') {
		const siteId = context.getNodeParameter('siteId', itemIndex) as string;
		return {
			method: 'GET',
			url: `/site/${siteId}/radius/users`,
			body: {},
		};
	}

	// Add more routing configurations for other resources/operations as needed

	// Default fallback
	return {
		method: 'GET',
		url: '/api/default',
		body: {},
	};
}
