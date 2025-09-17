import { INodeProperties } from 'n8n-workflow';

export const deploymentTokenOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'deploymentToken',
				],
			},
		},
		options: [
			{
				name: 'Create Deployment Token',
				value: 'create',
				action: 'Create deployment token',
				routing: {
					request: {
						method: 'POST',
						url: '/deploymentTokens',
						body: {
							groupUuid: '={{ $parameter.groupUuid }}',
							name: '={{ $parameter.name }}',
						},
					},
				},
			},
		],
		default: 'create',
	},
];

export const deploymentTokenFields: INodeProperties[] = [
	{
		displayName: 'Group UUID',
		name: 'groupUuid',
		type: 'string',
		default: '',
		description: 'The UUID of the group to create the deployment token for',
		displayOptions: {
			show: {
				resource: ['deploymentToken'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The name of the deployment token',
		displayOptions: {
			show: {
				resource: ['deploymentToken'],
				operation: ['create'],
			},
		},
	},
];
