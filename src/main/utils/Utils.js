import UserNotAuthenticatedError from '../connect/errors/UserNotAuthenticatedError.js';
import ConnectorFactory from '../connect/ConnectorFactory.js';

export default class Utils {
    static getLoginErrorPage(message) {
        return `/admin/login?error=${btoa(message)}`;
    }

    static getLoginSuccessPage(message) {
        return `/admin/login?success=${btoa(message)}`;
    }

    static async handleRequests(router, callback) {
        try {
            await callback();
        } catch(e) {
            if(e instanceof UserNotAuthenticatedError || e.statusCode === 401) {
                ConnectorFactory.clear();
                router.push(Utils.getLoginErrorPage(e.message));
            } else {
                throw e;
            }
        }
    }
}