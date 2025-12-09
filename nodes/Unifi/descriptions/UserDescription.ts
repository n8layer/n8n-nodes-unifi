import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get Users',
				value: 'getUsers',
				action: 'Get users',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/s/{{ $parameter.siteId }}/stat/widget/warnings',
					},
				},
			},
		],
		default: 'getUsers',
	},
];

export const userFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsers'],
			},
		},
		default: '',
		description: 'The User ID for the user',
		required: true,
	},
];
