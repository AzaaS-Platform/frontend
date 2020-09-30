import Fetcher from './Fetcher.js';

export default class Roles {
    static path = 'groups/';

    static async getAll() {
        return await Fetcher.Get(Roles.path);
    }

    static async get(entity) {
        return await Fetcher.Get(`${Roles.path}${entity}`);
    }

    static async add(group) {
        return await Fetcher.Post(Roles.path, group);
    }

    static async delete(entity) {
        return await Fetcher.Get(`${Roles.path}${entity}`);
    }
}