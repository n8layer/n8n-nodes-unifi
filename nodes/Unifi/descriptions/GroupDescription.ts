import { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Create Group',
				value: 'createGroup',
				action: 'Create group',
				routing: {
					request: {
						method: 'POST',
						url: '/groups',
						body: {
							customerUuid: '={{ $parameter.customerUuid }}',
							name: '={{ $parameter.name }}',
							basePolicyUuid: '={{ $parameter.basePolicyUuid || undefined }}',
						},
					},
				},
			},
			{
				name: 'Groups Search',
				value: 'getGroups',
				action: 'Groups search',
				routing: {
					request: {
						method: 'POST',
						url: '/groups/search',
						body: {
							page: '={{ $parameter.page }}',
							pageSize: '={{ $parameter.pageSize }}',
							sortProperty: '={{ $parameter.sortProperty || undefined }}',
							sortAscending: '={{ $parameter.sortAscending }}',
							nameContains: '={{ $parameter.nameContains || undefined }}',
							uuidEquals: '={{ $parameter.uuidEquals || undefined }}',
							policyUuidEquals: '={{ $parameter.policyUuidEquals || undefined }}',
							customerUuidEquals: '={{ $parameter.customerUuidEquals || undefined }}',
							customerNameContains: '={{ $parameter.customerNameContains || undefined }}',
							synchOptionsToMembers: '={{ $parameter.synchOptionsToMembers }}',
							synchAddonsToMembers: '={{ $parameter.synchAddonsToMembers }}',
						},
					},
				},
			},
		],
		default: 'getGroups',
	},
];

export const groupFields: INodeProperties[] = [
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'The page number to get',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},

	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		default: 10,
		description: 'The number of items to return per page',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
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
				resource: ['group'],
				operation: ['getGroups'],
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
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		default: '',
		description: 'The name of the group to search for',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},
	{
		displayName: 'UUID Equals',
		name: 'uuidEquals',
		type: 'string',
		default: '',
		description: 'The UUID of the group to search for',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},
	{
		displayName: 'Policy UUID Equals',
		name: 'policyUuidEquals',
		type: 'string',
		default: '',
		description: 'The UUID of the policy to search for',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},
	{
		displayName: 'Customer UUID Equals',
		name: 'customerUuidEquals',
		type: 'string',
		default: '',
		description: 'The UUID of the customer to search for',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},
	{
		displayName: 'Customer Name Contains',
		name: 'customerNameContains',
		type: 'string',
		default: '',
		description: 'The name of the customer to search for',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},
	{
		displayName: 'Synch Options To Members',
		name: 'synchOptionsToMembers',
		type: 'boolean',
		default: false,
		description: 'Whether to synch options to members',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},
	{
		displayName: 'Synch Addons To Members',
		name: 'synchAddonsToMembers',
		type: 'boolean',
		default: false,
		description: 'Whether to synch addons to members',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
	},
	{
		displayName: 'Customer UUID',
		name: 'customerUuid',
		type: 'string',
		required: true,
		default: '',
		description: 'The UUID of the customer to create the group for',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'The name of the group to create',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
	},
	{
		displayName: 'Base Policy UUID',
		name: 'basePolicyUuid',
		type: 'string',
		default: '',
		description: 'The UUID of the base policy to create the group for',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
	},
];