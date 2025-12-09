import { INodeProperties } from "n8n-workflow";

export const sitesAndMonitoringOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sitesAndMonitoring'],
			},
		},
		options: [
			{
				name: 'Client DPI',
				value: 'getClientDPI',
				action: 'Get client DPI',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/s/{{ $parameter.siteId }}/stat/stadpi',
					},
				},
			},
			{
				name: 'DPI Stats',
				value: 'getDPIStats',
				action: 'Get DPI stats',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/s/{{ $parameter.siteId }}/stat/dpi',
					},
				},
			},
			{
				name: 'Gateway Stats',
				value: 'getGatewayStats',
				action: 'Get gateway stats',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/s/{{ $parameter.siteId }}/stat/gateway',
					},
				},
			},
			{
				name: 'Historical Stats',
				value: 'getHistoricalStats',
				action: 'Get historical stats',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/s/{{ $parameter.siteId }}/stat/report/daily.site',
					},
				},
			},
		],
		default: 'getDPIStats',
	},
];

export const sitesAndMonitoringFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'siteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sitesAndMonitoring'],
				operation: ['getClientDPI', 'getDPIStats', 'getGatewayStats', 'getHistoricalStats'],
			},
		},
		default: '',
		description: 'Found in "name" field of the response from "Get Sites" operation',
	},
	{
		displayName: 'Split Into Items',
		name: 'splitIntoItems',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['sitesAndMonitoring'],
				operation: ['getClientDPI', 'getDPIStats', 'getGatewayStats', 'getHistoricalStats'],
			},
		},
		default: true,
		description: 'Whether to split each item into its own item (true) or return the raw response (false)',
	},
];
