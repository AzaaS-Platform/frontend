import Connector from './Connector.js';
import Authenticator from './Authenticator.js';
import UserNotAuthenticatedError from './errors/UserNotAuthenticatedError.js';
import NoSuchResourceError from './errors/NoSuchResourceError.js';
import Fetcher from './Fetcher.js';
import Server from '../utils/Server.js';
import Token from '../storage/Token.js';
import Client from '../storage/Client.js';

export default class ConnectorFactory {
    static async authenticate(client, login, password, token = undefined) {
        Client.save(client);
        ConnectorFactory.AUTHENTICATOR = new Authenticator(client, null);
        await ConnectorFactory.AUTHENTICATOR.authenticate(login, password, token);
    }

    static async authenticateWithRedirect(returnUrl, client, login, password, token = undefined) {
        return await Fetcher.Post(`${Server.API_BASE_URL}clients/${client}/token?returnUrl=${returnUrl}`, {}, {
            username: login,
            password,
            token
        });
    }

    static async register(client, login, password) {
        await Fetcher.Post(`${Server.API_BASE_URL}clients`, {}, {
            name: client,
            adminUsername: login,
            adminPassword: password
        });
        await ConnectorFactory.authenticate(client, login, password);
    }

    static async invalidate() {
        await Fetcher.Get(`${Server.API_BASE_URL}token/invalidate`, {
            Authorization: `Bearer ${ConnectorFactory.AUTHENTICATOR.token}`
        });

        ConnectorFactory.clear();
    }

    static clear() {
        Token.remove();
        ConnectorFactory.AUTHENTICATOR = null;
        ConnectorFactory.USERS_CONNECTOR = null;
        ConnectorFactory.GROUPS_CONNECTOR = null;
        ConnectorFactory.MFA_CONNECTOR = null;
    }

    static getConnector(type) {
        if(!ConnectorFactory.AUTHENTICATOR && !Client.restore()) {
            throw new UserNotAuthenticatedError("User is not authenticated");
        } else if(!ConnectorFactory.AUTHENTICATOR) {
            const token = Token.restore();
            if(token === null) throw new UserNotAuthenticatedError('Invalid token');
            ConnectorFactory.AUTHENTICATOR = new Authenticator(Client.restore(), token);
        }

        switch(type) {
            case "users":
                if(!ConnectorFactory.USERS_CONNECTOR) {
                    ConnectorFactory.USERS_CONNECTOR = new Connector('users', ConnectorFactory.AUTHENTICATOR);
                }
                return ConnectorFactory.USERS_CONNECTOR;
            case "roles":
                if(!ConnectorFactory.GROUPS_CONNECTOR) {
                    ConnectorFactory.GROUPS_CONNECTOR = new Connector('groups', ConnectorFactory.AUTHENTICATOR);
                }
                return ConnectorFactory.GROUPS_CONNECTOR;
            case "mfa":
                if(!ConnectorFactory.MFA_CONNECTOR) {
                    ConnectorFactory.MFA_CONNECTOR = new Connector(`users/${Token.extractUser(Token.restore())}/mfa`, ConnectorFactory.AUTHENTICATOR);
                }
                return ConnectorFactory.MFA_CONNECTOR;
            default:
                throw new NoSuchResourceError('There is no REST API for this resource');
        }
    }
}