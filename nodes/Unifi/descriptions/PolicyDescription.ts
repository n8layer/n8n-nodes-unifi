import { INodeProperties } from 'n8n-workflow';

export const policyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['policy'],
			},
		},
		options: [
			{
				name: 'Search Policy',
				value: 'get',
				action: 'Search policy',
				routing: {
					request: {
						method: 'POST',
						url: '/policies/search',
						body: {
							page: '={{ $parameter.page }}',
							pageSize: '={{ $parameter.pageSize }}',
							sortProperty: '={{ $parameter.sortProperty || undefined }}',
							sortAscending: '={{ $parameter.sortAscending }}',
							uuidEquals: '={{ $parameter.uuidEquals || undefined }}',
							groupUuidEquals: '={{ $parameter.groupUuidEquals || undefined }}',
							groupNameContains: '={{ $parameter.groupNameContains || undefined }}',
							customerNameContains: '={{ $parameter.customerNameContains || undefined }}',
							customerUuidEquals: '={{ $parameter.customerUuidEquals || undefined }}',
							createdBefore: '={{ $parameter.createdBefore || undefined }}',
							createdAfter: '={{ $parameter.createdAfter || undefined }}',
						},
					},
				},
			},
		],
		default: 'get',
	},
];

export const policyFields: INodeProperties[] = [
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'The page number to get',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get'],
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
				resource: ['policy'],
				operation: ['get'],
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
				resource: ['policy'],
				operation: ['get'],
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
				resource: ['policy'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'UUID Equals',
		name: 'uuidEquals',
		type: 'string',
		default: '',
		description: 'The UUID of the policy to get',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Group UUID Equals',
		name: 'groupUuidEquals',
		type: 'string',
		default: '',
		description: 'The UUID of the group to get',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Group Name Contains',
		name: 'groupNameContains',
		type: 'string',
		default: '',
		description: 'The name of the group to get',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Customer Name Contains',
		name: 'customerNameContains',
		type: 'string',
		default: '',
		description: 'The name of the customer to get',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Customer UUID Equals',
		name: 'customerUuidEquals',
		type: 'string',
		default: '',
		description: 'The UUID of the customer to get',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Created Before',
		name: 'createdBefore',
		type: 'string',
		default: '',
		description: 'The date before which the policy was created',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Created After',
		name: 'createdAfter',
		type: 'string',
		default: '',
		description: 'The date after which the policy was created',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get'],
			},
		},
	},
];