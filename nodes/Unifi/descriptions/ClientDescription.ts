import { INodeProperties } from "n8n-workflow";

export const clientOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['client'],
			},
		},
		options: [
			{
				name: 'Block Client',
				value: 'blockClient',
				action: 'Block client',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/s/{{ $parameter.siteId }}/cmd/stamgr',
						body: {
							cmd: 'block-sta',
							mac: '={{ $parameter.macAddress }}',
						},
					},
				},
			},
			{
				name: 'Disconnect Client',
				value: 'disconnectClient',
				action: 'Disconnect client',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/s/{{ $parameter.siteId }}/cmd/stamgr',
						body: {
							cmd: 'disconnect-sta',
							mac: '={{ $parameter.macAddress }}',
						},
					},
				},
			},
		{
			name: 'List Active Clients',
			value: 'listActiveClients',
			action: 'List active clients',
			routing: {
				request: {
					method: 'GET',
					url: '=/api/s/{{ $parameter.siteId }}/stat/sta',
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
			name: 'List All Clients',
			value: 'listAllClients',
			action: 'List all clients',
			routing: {
				request: {
					method: 'GET',
					url: '=/api/s/{{ $parameter.siteId }}/stat/alluser',
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
			name: 'List Client Details',
			value: 'getClientDetails',
			action: 'List client details',
			routing: {
				request: {
					method: 'GET',
					url: '=/api/s/{{ $parameter.siteId }}/stat/user/{{ $parameter.macAddress }}',
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
				name: 'Unblock Client',
				value: 'unblockClient',
				action: 'Unblock client',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/s/{{ $parameter.siteId }}/cmd/stamgr',
						body: {
							cmd: 'unblock-sta',
							mac: '={{ $parameter.macAddress }}',
						},
					},
				},
			}
		],
		default: 'listActiveClients',
	},
];

export const clientFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'siteId',
		type: 'string',
		default: '',
		description: 'Found in "name" field of the response from "List Sites" operation',
		required: true,
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['blockClient', 'disconnectClient', 'listActiveClients', 'listAllClients', 'getClientDetails', 'unblockClient'],
			},
		},
	},
	{
		displayName: 'Split Into Items',
		name: 'splitIntoItems',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['listActiveClients', 'listAllClients', 'getClientDetails'],
			},
		},
		default: true,
		description: 'Whether to split each client into its own item (true) or return the raw response (false)',
	},
	{
		displayName: 'MAC Address',
		name: 'macAddress',
		type: 'string',
		default: '',
		description: 'The MAC Address of the client to get info for',
		required: true,
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['blockClient', 'disconnectClient', 'getClientDetails', 'unblockClient'],
			},
		},
	},
];
