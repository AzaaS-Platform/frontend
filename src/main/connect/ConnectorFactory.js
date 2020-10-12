import Connector from './Connector.js';
import Authenticator from './Authenticator.js';
import UserNotAuthenticatedError from './errors/UserNotAuthenticatedError.js';
import NoSuchResourceError from './errors/NoSuchResourceError.js';
import Fetcher from './Fetcher.js';
import Server from './Server.js';
import Token from './Token.js';

export default class ConnectorFactory {
    static async authenticate(client, login, password) {
        localStorage.setItem('client', client);
        ConnectorFactory.AUTHENTICATOR = new Authenticator(client);
        await ConnectorFactory.AUTHENTICATOR.authenticate(login, password);
    }

    static async invalidate() {
        await Fetcher.Get(`${Server.API_BASE_URL}token/invalidate`, {
            Authorization: `Bearer ${ConnectorFactory.AUTHENTICATOR.token}`
        });

        Token.remove();
        ConnectorFactory.AUTHENTICATOR = null;
        ConnectorFactory.USERS_CONNECTOR = null;
        ConnectorFactory.GROUPS_CONNECTOR = null;
    }

    static getConnector(type) {
        if(!ConnectorFactory.AUTHENTICATOR && !localStorage.getItem('client')) {
            throw new UserNotAuthenticatedError("User is not authenticated");
        } else if(!ConnectorFactory.AUTHENTICATOR) {
            ConnectorFactory.AUTHENTICATOR = new Authenticator(localStorage.getItem('client'));
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
            default:
                throw new NoSuchResourceError('There is no REST API for this resource');
        }
    }
}