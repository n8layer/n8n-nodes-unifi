import {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
	Icon,
} from 'n8n-workflow';

export class UnifiApi implements ICredentialType {
	name = 'unifiApi';
	displayName = 'Unifi API';
	icon = 'file:Unifi.svg' as Icon;
	documentationUrl = 'https://developer.unifitech.com/api/docs/index.html';

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.serverUrl.replace("/v2/api", "")}}',
			url: '/api/login',
			method: 'POST',
			body: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
		},
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: 'https://unifi.yourcompany.com:8888/v2/api',
			placeholder: 'https://unifi.yourcompany.com:8888/v2/api',
			description: 'The base URL of your UniFi server',
			required: true,
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			placeholder: 'hostfuseadmin',
			description: 'Username for UniFi authentication',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'Password for UniFi authentication',
			required: true,
		},
	];

}
