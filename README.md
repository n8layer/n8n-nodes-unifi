# n8n-nodes-unifi

This is an n8n community node. It lets you use Unifi in your n8n workflows.

Unifi is a comprehensive endpoint security and management platform that provides advanced threat protection, policy management, and endpoint control capabilities for organizations.

This node provides comprehensive operations for managing customers, deployment tokens, endpoints, groups, policies, and unblock requests through the Unifi API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following operations:

### Customer
- **Search Customers**: Retrieve a list of customers with optional filtering by name, UUID, enabled status, and creation date with pagination support
- **Create Customer**: Create a new customer with a name and base policy UUID

### Deployment Token
- **Create Deployment Token**: Create a new deployment token for a specific group with a given name

### Endpoint
- **Search Endpoints**: Retrieve a list of endpoints with comprehensive filtering options including name, UUID, license ID, customer UUID, group UUID, agent state, and last seen date with pagination support
- **Enable Endpoint**: Enable a specific endpoint by UUID
- **Disable Endpoint**: Disable a specific endpoint by UUID
- **Isolate Endpoint**: Isolate a specific endpoint by UUID for security purposes
- **Release Endpoint**: Release an isolated endpoint by UUID
- **Restart Service**: Restart the service on a specific endpoint by UUID

### Group
- **Groups Search**: Retrieve a list of groups with filtering options by name, UUID, policy UUID, customer UUID, and synchronization settings with pagination support
- **Create Group**: Create a new group with a customer UUID, name, and optional base policy UUID

### Policy
- **Search Policy**: Retrieve a list of policies with filtering options by UUID, group UUID, group name, customer name, customer UUID, and creation date with pagination support

### Unblock Request
- **Unblock Request**: Search for active unblock requests with filtering options by customer UUID, policy UUID, logged-on user, and request date with pagination support

## Credentials

To use this node, you'll need to set up API credentials with Unifi. Here's how:

1. **Access your Unifi portal**:
   - Log in to your Unifi admin portal
   - Navigate to **API Settings** or **Developer Tools**

2. **Generate API Token**:
   - Create a new API token
   - Copy the generated token

3. **In n8n**:
   - Create new credentials for "Unifi API"
   - Enter the API Token from your Unifi portal
   - The Base URL will default to: `https://developer.unifitech.com/api`
   - Save the credentials

## Compatibility

This node is compatible with n8n version 1.82.0 and above.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Unifi](https://unifitech.com/)
* [Unifi API Documentation](https://developer.unifitech.com/api/docs/index.html)


