import { INodeProperties } from "n8n-workflow";

export const internetAccessControlOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['internetAccessControl'],
			},
		},
		options: [
			{
				name: 'Bandwidth Limits',
				value: 'bandwidthLimits',
				action: 'Bandwidth limits',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/s/{{ $parameter.siteId }}/rest/user/trafficrule',
					},
				},
			},
			{
				name: 'Set Access',
				value: 'setAccess',
				action: 'Set access',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/s/{{ $parameter.siteId }}/rest/user/{{ $parameter.clientId }}',
						body: {
							use_fixed_ip: '={{ $parameter.useFixedIp }}',
							network_access: '={{ $parameter.networkAccess }}',
							fixed_ip: '={{ $parameter.fixedIp }}',
							usergroup_id: '={{ $parameter.usergroupId }}',
						},
					},
				},

			},
		],
		default: 'setAccess',
	},
];

export const internetAccessControlFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'siteId',
		type: 'string',
		default: '',
		description: 'Found in "name" field of the response from "List All Clients" operation',
		required: true,
		displayOptions: {
			show: {
				resource: ['internetAccessControl'],
				operation: ['setAccess', 'bandwidthLimits'],
			},
		},
	},
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		description: 'The Client ID to set internet access control for',
		required: true,
		displayOptions: {
			show: {
				resource: ['internetAccessControl'],
				operation: ['setAccess'],
			},
		},
	},
	{
		displayName: 'Use Fixed IP',
		name: 'useFixedIp',
		type: 'boolean',
		default: false,
		description: 'Whether to use a fixed IP for the client',
		required: true,
		displayOptions: {
			show: {
				resource: ['internetAccessControl'],
				operation: ['setAccess'],
			},
		},
	},
	{
		displayName: 'Network Access',
		name: 'networkAccess',
		type: 'string',
		default: '',
		description: 'The network access to set for the client',
		required: true,
		displayOptions: {
			show: {
				resource: ['internetAccessControl'],
				operation: ['setAccess'],
			},
		},
	},
	{
		displayName: 'Fixed IP',
		name: 'fixedIp',
		type: 'string',
		default: '',
		description: 'The Fixed IP to set for the client',
		required: true,
		displayOptions: {
			show: {
				resource: ['internetAccessControl'],
				operation: ['setAccess'],
			},
		},
	},
	{
		displayName: 'Usergroup ID',
		name: 'usergroupId',
		type: 'string',
		default: '',
		description: 'Existing group ID',
		required: true,
		displayOptions: {
			show: {
				resource: ['internetAccessControl'],
				operation: ['setAccess'],
			},
		},
	},
];
