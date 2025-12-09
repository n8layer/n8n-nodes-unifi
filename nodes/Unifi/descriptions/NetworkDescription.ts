import { INodeProperties } from "n8n-workflow";

export const networkOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['network'],
			},
		},
		options: [
			{
				name: 'Create Network',
				value: 'createNetwork',
				action: 'Create network',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/s/{{ $parameter.siteId }}/rest/networkconf',
						body: {
							name: '={{ $parameter.name }}',
							x_passphrase: '={{ $parameter.password }}',
							security: '={{ $parameter.security }}',
							wpa_mode: '={{ $parameter.wpaMode }}',
							enabled: '={{ $parameter.enabled }}',
							is_guest: '={{ $parameter.isGuest }}',
							vlan_enabled: '={{ $parameter.vlanEnabled }}',
						},
					},
				},
			},
			{
				name: 'Delete WiFi Network',
				value: 'deleteWiFiNetwork',
				action: 'Delete wifi network',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/s/{{ $parameter.siteId }}/rest/networkconf/{{ $parameter.networkId }}',
					},
				},
			},
			{
				name: 'List Networks',
				value: 'listNetworks',
				action: 'List networks',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/s/{{ $parameter.siteId }}/rest/networkconf',
					},
				},
			},
			{
				name: 'Update WiFi Network',
				value: 'updateWiFiNetwork',
				action: 'Update wifi network',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/s/{{ $parameter.siteId }}/rest/networkconf/{{ $parameter.networkId }}',
						body: {
							name: '={{ $parameter.name }}',
							x_passphrase: '={{ $parameter.password }}',
							security: '={{ $parameter.security }}',
							wpa_mode: '={{ $parameter.wpaMode }}',
							enabled: '={{ $parameter.enabled }}',
							is_guest: '={{ $parameter.isGuest }}',
							vlan_enabled: '={{ $parameter.vlanEnabled }}',
						},
					},
				},
			},
		],
		default: 'listNetworks',
	},
];

export const networkFields: INodeProperties[] = [
	{
		displayName: 'Site Name',
		name: 'siteId',
		type: 'string',
		default: '',
		description: 'Found in "name" field of the response from "List Sites" operation',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork', 'updateWiFiNetwork', 'listNetworks'],
			},
		},
	},
	{
		displayName: 'Network ID',
		name: 'networkId',
		type: 'string',
		default: '',
		description: 'Client Network ID',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['deleteNetwork', 'updateNetwork'],
			},
		},
	},
	{
		displayName: 'SSID',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The SSID of the network',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork', 'updateWiFiNetwork'],
			},
		},
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		description: 'The password of the network',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork', 'updateNetwork'],
			},
		},
	},
	{
		displayName: 'Security',
		name: 'security',
		type: 'options',
		description: 'The security of the network',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork', 'updateNetwork'],
			},
		},
		options: [
			{
				name: 'WPAPSK',
				value: 'wpapsk',
			},
			{
				name: 'WPAEAP',
				value: 'wpaeap',
			},
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'WEP',
				value: 'wep',
			},
		],
		default: 'wpapsk',
	},
	{
		displayName: 'WPA Mode',
		name: 'wpaMode',
		type: 'options',
		description: 'The WPA mode of the network',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork', 'updateNetwork'],
			},
		},
		options: [
			{
				name: 'WPA',
				value: 'wpa',
			},
			{
				name: 'WPA2',
				value: 'wpa2',
			},
			{
				name: 'WPA3',
				value: 'wpa3',
			},
		],
		default: 'wpa2',
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork', 'updateWiFiNetwork'],
			},
		},
		default: true,
		description: 'Whether the network is enabled',
		required: true,
	},
	{
		displayName: 'VLAN Enabled',
		name: 'vlanEnabled',
		type: 'boolean',
		default: false,
		description: 'Whether the VLAN is enabled',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork', 'updateNetwork'],
			},
		},
	},
	{
		displayName: 'Split Into Items',
		name: 'splitIntoItems',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['listNetworks'],
			},
		},
		default: true,
		description: 'Whether to split each network into its own item (true) or return the raw response (false)',
	},
];
