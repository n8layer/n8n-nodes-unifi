import type { INodeProperties } from 'n8n-workflow';

export const siteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'site',
				],
			},
		},
		options: [
			{
				name: 'Get Sites',
				value: 'getMany',
				action: 'Get sites',
				routing: {
					request: {
						method: 'POST',
						url: '/sites/overview',
						body: {
							searchText: '={{ $parameter.searchText || "" }}',
							sortByField: '={{ $parameter.sortByField || "description" }}',
							sortDirection: '={{ $parameter.sortDirection || "ASCENDING" }}',
							pageSize: '={{ $parameter.pageSize || 100 }}',
							pageNumber: '={{ $parameter.pageNumber || 0 }}',
						},
					},
				},
			},
			{
				name: 'Get RADIUS Users',
				value: 'getRadiusUsers',
				action: 'Get RADIUS users',
				routing: {
					request: {
						method: 'GET',
						url: '=/site/{{ $parameter.siteId }}/radius/users',
					},
				},
			},
			{
				name: 'Create RADIUS User',
				value: 'createRadiusUser',
				action: 'Create RADIUS user',
				routing: {
					request: {
						method: 'POST',
						url: '=/site/{{ $parameter.siteId }}/radius/users/batch_add',
						body: [
							{
								name: '={{ $parameter.name }}',
								x_password: '={{ $parameter.password }}',
								vlan: '={{ $parameter.vlan || "" }}',
								tunnel_type: '={{ $parameter.tunnelType || 3 }}',
								tunnel_medium_type: '={{ $parameter.tunnelMediumType || 1 }}',
							},
						],
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const siteFields: INodeProperties[] = [
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getRadiusUsers', 'createRadiusUser'],
			},
		},
		default: '',
		description: 'The Site ID for RADIUS operations',
		required: true,
	},
	{
		displayName: 'Search Text',
		name: 'searchText',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Text to search for in site names/descriptions',
	},
	{
		displayName: 'Sort By Field',
		name: 'sortByField',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				name: 'Description',
				value: 'description',
			},
			{
				name: 'Name',
				value: 'name',
			},
		],
		default: 'description',
		description: 'Field to sort results by',
	},
	{
		displayName: 'Sort Direction',
		name: 'sortDirection',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				name: 'Ascending',
				value: 'ASCENDING',
			},
			{
				name: 'Descending',
				value: 'DESCENDING',
			},
		],
		default: 'ASCENDING',
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getMany'],
			},
		},
		default: 100,
		description: 'Number of items to return per page',
	},
	{
		displayName: 'Page Number',
		name: 'pageNumber',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getMany'],
			},
		},
		default: 0,
		description: 'Page number to return (0-based)',
	},
	// Create RADIUS User fields
	{
		displayName: 'User Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createRadiusUser'],
			},
		},
		default: '',
		description: 'Username for the RADIUS user',
		required: true,
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createRadiusUser'],
			},
		},
		typeOptions: {
			password: true,
		},
		default: '',
		description: 'Password for the RADIUS user',
		required: true,
	},
	{
		displayName: 'VLAN',
		name: 'vlan',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createRadiusUser'],
			},
		},
		default: '',
		description: 'VLAN assignment for the user (optional)',
	},
	{
		displayName: 'Tunnel Type',
		name: 'tunnelType',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createRadiusUser'],
			},
		},
		default: 3,
		description: 'Tunnel type for RADIUS user (default: 3)',
	},
	{
		displayName: 'Tunnel Medium Type',
		name: 'tunnelMediumType',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createRadiusUser'],
			},
		},
		default: 1,
		description: 'Tunnel medium type for RADIUS user (default: 1)',
	},
];
