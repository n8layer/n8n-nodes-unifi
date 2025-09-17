import { INodeProperties } from "n8n-workflow";

export const endpointOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['endpoint'],
			},
		},
		options: [
			{
				name: 'Disable Endpoint',
				value: 'disableEndpoint',
				action: 'Disable endpoint',
				routing: {
					request: {
						method: 'POST',
						url: '=/endpoints/{{ $parameter.endpointUuid }}/actions/disable',
					},
				},
			},
			{
				name: 'Enable Endpoint',
				value: 'enableEndpoint',
				action: 'Enable endpoint',
				routing: {
					request: {
						method: 'POST',
						url: '=/endpoints/{{ $parameter.endpointUuid }}/actions/enable',
					},
				},
			},
			{
				name: 'Isolate Endpoint',
				value: 'isolateEndpoint',
				action: 'Isolate endpoint',
				routing: {
					request: {
						method: 'POST',
						url: '=/endpoints/{{ $parameter.endpointUuid }}/actions/isolate',
					},
				},
			},
			{
				name: 'Release Endpoint',
				value: 'releaseEndpoint',
				action: 'Release endpoint',
				routing: {
					request: {
						method: 'POST',
						url: '=/endpoints/{{ $parameter.endpointUuid }}/actions/release',
					},
				},
			},
			{
				name: 'Restart Service',
				value: 'restartService',
				action: 'Restart service',
				routing: {
					request: {
						method: 'POST',
						url: '=/endpoints/{{ $parameter.endpointUuid }}/actions/restart-service',
					},
				},
			},
			{
				name: 'Search Endpoints',
				value: 'searchEndpoints',
				action: 'Search endpoints',
				routing: {
					request: {
						method: 'POST',
						url: '/endpoints/search',
						body: {
							page: '={{ $parameter.page }}',
							pageSize: '={{ $parameter.pageSize }}',
							sortProperty: '={{ $parameter.sortProperty && $parameter.sortProperty.trim() !== "" ? $parameter.sortProperty : undefined }}',
							sortAscending: '={{ $parameter.sortAscending }}',
							nameContains: '={{ $parameter.nameContains && $parameter.nameContains.trim() !== "" ? $parameter.nameContains : undefined }}',
							isEnabled: '={{ $parameter.isEnabled }}',
							uuidEquals: '={{ $parameter.uuidEquals && $parameter.uuidEquals.trim() !== "" ? $parameter.uuidEquals : undefined }}',
							uuidIn: '={{ $parameter.uuidIn && $parameter.uuidIn.trim() !== "" ? $parameter.uuidIn.split(",").map(id => id.trim()).filter(id => id !== "") : undefined }}',
							licenseIdEquals: '={{ $parameter.licenseIdEquals && $parameter.licenseIdEquals.trim() !== "" ? $parameter.licenseIdEquals : undefined }}',
							licenseIdIn: '={{ $parameter.licenseIdIn && $parameter.licenseIdIn.trim() !== "" ? $parameter.licenseIdIn.split(",").map(id => id.trim()).filter(id => id !== "") : undefined }}',
							customerUuidEquals: '={{ $parameter.customerUuidEquals && $parameter.customerUuidEquals.trim() !== "" ? $parameter.customerUuidEquals : undefined }}',
							customerUuidIn: '={{ $parameter.customerUuidIn && $parameter.customerUuidIn.trim() !== "" ? $parameter.customerUuidIn.split(",").map(id => id.trim()).filter(id => id !== "") : undefined }}',
							groupUuidEquals: '={{ $parameter.groupUuidEquals && $parameter.groupUuidEquals.trim() !== "" ? $parameter.groupUuidEquals : undefined }}',
							groupUuidIn: '={{ $parameter.groupUuidIn && $parameter.groupUuidIn.trim() !== "" ? $parameter.groupUuidIn.split(",").map(id => id.trim()).filter(id => id !== "") : undefined }}',
							isInErrorState: '={{ $parameter.isInErrorState }}',
							agentStateEquals: '={{ $parameter.agentStateEquals && $parameter.agentStateEquals.trim() !== "" ? $parameter.agentStateEquals : undefined }}',
							lastSeenBefore: '={{ $parameter.lastSeenBefore && $parameter.lastSeenBefore.trim() !== "" ? $parameter.lastSeenBefore : undefined }}',
							lastSeenAfter: '={{ $parameter.lastSeenAfter && $parameter.lastSeenAfter.trim() !== "" ? $parameter.lastSeenAfter : undefined }}',
						},
					},
				},
			},
		],
		default: 'enableEndpoint',
	},
];

export const endpointFields: INodeProperties[] = [
	{
		displayName: 'Endpoint UUID',
		name: 'endpointUuid',
		type: 'string',
		default: '',
		required: true,
		description: 'The UUID of the endpoint to enable',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['enableEndpoint', 'disableEndpoint', 'isolateEndpoint', 'releaseEndpoint', 'restartService'],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'The page number to get',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		default: 10,
		description: 'The number of items to get per page',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Sort Property',
		name: 'sortProperty',
		type: 'string',
		default: '',
		description: 'The property to sort by',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Sort Ascending',
		name: 'sortAscending',
		type: 'boolean',
		default: true,
		description: 'Whether to sort in ascending order',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		default: '',
		description: 'The name of the endpoint to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Is Enabled',
		name: 'isEnabled',
		type: 'boolean',
		default: true,
		description: 'Whether the endpoint is enabled',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'UUID Equals',
		name: 'uuidEquals',
		type: 'string',
		default: '',
		description: 'The UUID of the endpoint to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'UUID In',
		name: 'uuidIn',
		type: 'string',
		default: '',
		description: 'The UUIDs of the endpoints to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'License ID Equals',
		name: 'licenseIdEquals',
		type: 'string',
		default: '',
		description: 'The license ID of the endpoint to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'License ID In',
		name: 'licenseIdIn',
		type: 'string',
		default: '',
		description: 'The license IDs of the endpoints to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Customer UUID Equals',
		name: 'customerUuidEquals',
		type: 'string',
		default: '',
		description: 'The customer UUID of the endpoint to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Customer UUID In',
		name: 'customerUuidIn',
		type: 'string',
		default: '',
		description: 'The customer UUIDs of the endpoints to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Group UUID Equals',
		name: 'groupUuidEquals',
		type: 'string',
		default: '',
		description: 'The group UUID of the endpoint to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Group UUID In',
		name: 'groupUuidIn',
		type: 'string',
		default: '',
		description: 'The group UUIDs of the endpoints to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Is In Error State',
		name: 'isInErrorState',
		type: 'boolean',
		default: false,
		description: 'Whether the endpoint is in error state',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Agent State Equals',
		name: 'agentStateEquals',
		type: 'string',
		default: '',
		description: 'The agent state of the endpoint to search for',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Last Seen Before',
		name: 'lastSeenBefore',
		type: 'string',
		default: '',
		description: 'The date before which the endpoint was last seen',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
	{
		displayName: 'Last Seen After',
		name: 'lastSeenAfter',
		type: 'string',
		default: '',
		description: 'The date after which the endpoint was last seen',
		displayOptions: {
			show: {
				resource: ['endpoint'],
				operation: ['searchEndpoints'],
			},
		},
	},
];