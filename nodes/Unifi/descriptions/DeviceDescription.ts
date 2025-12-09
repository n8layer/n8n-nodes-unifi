import { INodeProperties } from 'n8n-workflow';

export const deviceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['device'],
			},
		},
		options: [
		{
			name: 'List All Devices',
			value: 'listAllDevices',
			action: 'List all devices',
			routing: {
				request: {
					method: 'GET',
					url: '=/api/s/{{ $parameter.siteId }}/stat/device',
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
			name: 'List Device Info',
			value: 'getDeviceInfo',
			action: 'List device info',
			routing: {
				request: {
					method: 'GET',
					url: '=/api/s/{{ $parameter.siteId }}/stat/device/{{ $parameter.macAddress }}',
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
			name: 'List Device Stats',
			value: 'getDeviceStats',
			action: 'List device stats',
			routing: {
				request: {
					method: 'GET',
					url: '=/api/s/{{ $parameter.siteId }}/stat/device/{{ $parameter.macAddress }}/stats',
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
			name: 'Restart Device',
			value: 'restartDevice',
			action: 'Restart device',
			routing: {
				request: {
					method: 'POST',
					url: '=/api/s/{{ $parameter.siteId }}/cmd/devmgr',
					body: {
						cmd: 'restart',
						mac: '={{ $parameter.macAddress }}',
						reboot_type: 'soft',
					},
				},
			},
		},
		{
			name: 'Upgrade Device Firmware',
			value: 'upgradeDeviceFirmware',
			action: 'Upgrade device firmware',
			routing: {
				request: {
					method: 'POST',
					url: '=/api/s/{{ $parameter.siteId }}/cmd/devmgr',
					body: {
						cmd: 'upgrade',
						mac: '={{ $parameter.macAddress }}',
					},
				},
			},
		},
	],
		default: 'listAllDevices',
	},
];

export const deviceFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'siteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['listAllDevices', 'getDeviceInfo', 'getDeviceStats', 'restartDevice'],
			},
		},
		default: '',
		description: 'Found in "name" field of the response from "List All Devices" operation',
		required: true,
	},
	{
		displayName: 'Split Into Items',
		name: 'splitIntoItems',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['listAllDevices', 'getDeviceInfo', 'getDeviceStats'],
			},
		},
		default: true,
		description: 'Whether to split each device into its own item (true) or return the raw response (false)',
	},
	{
		displayName: 'MAC Address',
		name: 'macAddress',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['getDeviceInfo', 'getDeviceStats', 'restartDevice'],
			},
		},
		description: 'The MAC Address of the device to get info for',
		required: true,
	},
];
