import UserNotAuthenticatedError from '../connect/errors/UserNotAuthenticatedError.js';
import ConnectorFactory from '../connect/ConnectorFactory.js';

export default class Utils {
    static getLoginErrorPage(message) {
        return `/admin/login?error=${btoa(message)}`;
    }

    static async handleRequests(router, callback) {
        try {
            await callback();
        } catch (e) {
            if (e instanceof UserNotAuthenticatedError || e.statusCode === 401) {
                ConnectorFactory.clear();
                router.push(Utils.getLoginErrorPage(e.message));
            } else {
                throw e;
            }
        }
    }

    static redirect(url, data) {
        let formString = `<form name="redirect-form" action="${url}" style="display:none" method="post">`
        for (let param of Object.keys(data)) {
            formString += `<input type="text" name="${param}" value="${data[param]}" />`;
        }
        formString += '</form>'

        const body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('beforeend', formString);
        document.forms['redirect-form'].submit();
    }
}