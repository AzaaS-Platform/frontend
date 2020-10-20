import Fetcher from './Fetcher.js';
import Server from '../utils/Server.js';

export default class Connector {
    constructor(path, authenticator) {
        this.path = path;
        this.authenticator = authenticator;
    }

    async getAll() {
        return await Fetcher.Get(`${Server.API_BASE_URL}clients/${this.authenticator.client}/${this.path}`, await this.authenticator.getAuthorizationHeader());
    }

    async get(entity = '') {
        return await Fetcher.Get(`${Server.API_BASE_URL}clients/${this.authenticator.client}/${this.path}/${entity}`, await this.authenticator.getAuthorizationHeader());
    }

    async add(data) {
        return await Fetcher.Post(`${Server.API_BASE_URL}clients/${this.authenticator.client}/${this.path}`, await this.authenticator.getAuthorizationHeader(), data);
    }

    async modify(entity = '', data) {
        await Fetcher.Put(`${Server.API_BASE_URL}clients/${this.authenticator.client}/${this.path}/${entity}`, await this.authenticator.getAuthorizationHeader(), data);
    }

    async delete(entity = '') {
        await Fetcher.Delete(`${Server.API_BASE_URL}clients/${this.authenticator.client}/${this.path}/${entity}`, await this.authenticator.getAuthorizationHeader());
    }
}