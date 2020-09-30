import Fetcher from './connect/Fetcher.js';

export default class Users {
    static async getAll() {
        const data = await Fetcher.Get('users');
        if(data.statusCode === 200) {
            return data.payload;
        } else {
            throw data.message;
        }
    }

    static async get(entity) {
        const data = await Fetcher.Get(`users/${entity}`);
        if(data.statusCode === 200) {
            return data.payload;
        } else {
            throw data.message;
        }
    }
}