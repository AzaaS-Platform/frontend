import Fetcher from '@/main/connect/Fetcher.js';
import Server from '@/main/utils/Server.js';

export default class ApiHelper {

    static async authenticateWithRedirect(returnUrl, client, login, password, token = undefined) {
        return await Fetcher.Post(`${Server.API_BASE_URL}token?returnUrl=${returnUrl}`, {
            "x-azaas-client": client
        }, {
            username: login,
            password,
            token
        });
    }
}