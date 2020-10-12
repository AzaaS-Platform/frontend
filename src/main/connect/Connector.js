import Fetcher from './Fetcher.js';

export default class Connector {
    static SERVER_ADDRESS = /*'https://ad1o51iav4.execute-api.eu-central-1.amazonaws.com/dev/'*/'http://localhost:3000/dev/';
    static CLIENT = 'tak';

    constructor(path) {
        this.path = path;
    }

    async getAll() {
        return await Fetcher.Get(`${Connector.SERVER_ADDRESS}clients/${Connector.CLIENT}/${this.path}`);
    }

    async get(entity) {
        return await Fetcher.Get(`${Connector.SERVER_ADDRESS}clients/${Connector.CLIENT}/${this.path}${entity}`);
    }

    async add(data) {
        return await Fetcher.Post(`${Connector.SERVER_ADDRESS}clients/${Connector.CLIENT}/${this.path}`, data);
    }

    async modify(entity, data) {
        await Fetcher.Put(`${Connector.SERVER_ADDRESS}clients/${Connector.CLIENT}/${this.path}${entity}`, data);
    }

    async delete(entity) {
        await Fetcher.Delete(`${Connector.SERVER_ADDRESS}clients/${Connector.CLIENT}/${this.path}${entity}`);
    }
}