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
			{
				name: 'Create Site',
				value: 'createSite',
				action: 'Create site',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/s/default/cmd/sitemgr',
						body: {
							cmd: 'add-site',
							desc: '={{ $parameter.name }}',
						},
					},
				},
			},
			{
				name: 'Delete Site',
				value: 'deleteSite',
				action: 'Delete site',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/s/default/cmd/sitemgr',
						body: {
							cmd: 'delete-site',
							site: '={{ $parameter.longSiteId }}',
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
				name: 'Get Site Health',
				value: 'getSiteHealth',
				action: 'Get site health',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/s/{{ $parameter.siteId }}/stat/health',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
								enabled: '={{ $parameter.splitIntoItems === true }}',
							},
						],
					},
				},
			},
			{
				name: 'List Sites',
				value: 'getMany',
				action: 'List sites',
				routing: {
					request: {
						method: 'GET',
						url: '/api/self/sites',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
								enabled: '={{ $parameter.splitIntoItems === true }}',
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
		displayName: 'Name',
		name: 'siteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getRadiusUsers', 'createRadiusUser', 'getSiteHealth'],
			},
		},
		default: '',
		description: 'Found in "name" field of the response from "Get Sites" operation',
		required: true,
	},
	{
		displayName: 'Site ID',
		name: 'longSiteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['deleteSite'],
			},
		},
		default: '',
		description: 'Found in "_id" field of the response from "Get Sites" operation',
		required: true,
	},
	// {
	// 	displayName: 'Search Text',
	// 	name: 'searchText',
	// 	type: 'string',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['site'],
	// 			operation: ['getMany'],
	// 		},
	// 	},
	// 	default: '',
	// 	description: 'Text to search for in site names/descriptions',
	// },
	// {
	// 	displayName: 'Sort By Field',
	// 	name: 'sortByField',
	// 	type: 'options',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['site'],
	// 			operation: ['getMany'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			name: 'Description',
	// 			value: 'description',
	// 		},
	// 		{
	// 			name: 'Name',
	// 			value: 'name',
	// 		},
	// 	],
	// 	default: 'description',
	// 	description: 'Field to sort results by',
	// },
	// {
	// 	displayName: 'Sort Direction',
	// 	name: 'sortDirection',
	// 	type: 'options',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['site'],
	// 			operation: ['getMany'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			name: 'Ascending',
	// 			value: 'ASCENDING',
	// 		},
	// 		{
	// 			name: 'Descending',
	// 			value: 'DESCENDING',
	// 		},
	// 	],
	// 	default: 'ASCENDING',
	// },
	// {
	// 	displayName: 'Page Size',
	// 	name: 'pageSize',
	// 	type: 'number',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['site'],
	// 			operation: ['getMany'],
	// 		},
	// 	},
	// 	default: 100,
	// 	description: 'Number of items to return per page',
	// },
	// {
	// 	displayName: 'Page Number',
	// 	name: 'pageNumber',
	// 	type: 'number',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['site'],
	// 			operation: ['getMany'],
	// 		},
	// 	},
	// 	default: 0,
	// 	description: 'Page number to return (0-based)',
	// },
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
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createSite'],
			},
		},
		default: '',
		description: 'Name of the site',
		required: true,
	},
	{
		displayName: 'Split Into Items',
		name: 'splitIntoItems',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getMany', 'getSiteHealth'],
			},
		},
		default: true,
		description: 'Whether to split each site into its own item (true) or return the raw response (false)',
	},
];
