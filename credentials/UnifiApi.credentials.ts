import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UnifiApi implements ICredentialType {
	name = 'unifiApi';
	displayName = 'Unifi API';
	// icon = 'file:unifi.svg' as Icon;
	documentationUrl = 'https://developer.unifitech.com/api/docs/index.html';
	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: 'https://unifi.elasticit.com:8443/v2/api',
			placeholder: 'https://unifi.elasticit.com:8443/v2/api',
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
