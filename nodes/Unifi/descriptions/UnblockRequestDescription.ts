import { INodeProperties } from "n8n-workflow";

export const unblockRequestOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['unblockRequest'],
			},
		},
		options: [
			{
				name: 'Unblock Request',
				value: 'unblockRequest',
				action: 'Unblock request',
				routing: {
					request: {
						method: 'POST',
						url: '/unblock-requests/active/search',
						body: {
							page: '={{ $parameter.page }}',
							pageSize: '={{ $parameter.pageSize }}',
							sortProperty: '={{ $parameter.sortProperty || undefined }}',
							sortAscending: '={{ $parameter.sortAscending }}',
							customerUuidIn: '={{ $parameter.customerUuidIn || undefined }}',
							policyUuidIn: '={{ $parameter.policyUuidIn || undefined }}',
							loggedOnUserContains: '={{ $parameter.loggedOnUserContains || undefined }}',
							requestedBefore: '={{ $parameter.requestedBefore || undefined }}',
							requestedAfter: '={{ $parameter.requestedAfter || undefined }}',
						},
					},
				},
			},
		],
		default: 'unblockRequest',
	},
];

export const unblockRequestFields: INodeProperties[] = [
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'The page number to get',
		displayOptions: {
			show: {
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
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
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
			},
		},
	},
	{
		displayName: 'Sort Property',
		name: 'sortProperty',
		type: 'string',
		default: 'createdAt',
		description: 'The property to sort by',
		displayOptions: {
			show: {
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
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
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
			},
		},
	},
	{
		displayName: 'Customer UUID In',
		name: 'customerUuidIn',
		type: 'string',
		default: '',
		description: 'The UUID of the customer to search for',
		displayOptions: {
			show: {
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
			},
		},
	},
	{
		displayName: 'Policy UUID In',
		name: 'policyUuidIn',
		type: 'string',
		default: '',
		description: 'The UUID of the policy to search for',
		displayOptions: {
			show: {
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
			},
		},
	},
	{
		displayName: 'Logged On User Contains',
		name: 'loggedOnUserContains',
		type: 'string',
		default: '',
		description: 'The name of the logged on user to search for',
		displayOptions: {
			show: {
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
			},
		},
	},
	{
		displayName: 'Requested Before',
		name: 'requestedBefore',
		type: 'string',
		default: '',
		description: 'The date before which the unblock request was requested',
		displayOptions: {
			show: {
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
			},
		},
	},
	{
		displayName: 'Requested After',
		name: 'requestedAfter',
		type: 'string',
		default: '',
		description: 'The date after which the unblock request was requested',
		displayOptions: {
			show: {
				resource: ['unblockRequest'],
				operation: ['unblockRequest'],
			},
		},
	},
];