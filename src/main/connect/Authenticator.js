import Fetcher from './Fetcher.js';
import Server from './Server.js';
import Token from './Token.js';

export default class Authenticator {
    constructor(client) {
        this.client = client;
        this.token = Token.restore();
        if(this.token !== null && Token.extractExpTime(this.token)) {
            this.expTime = Token.extractExpTime(this.token);
        }
    }

    async authenticate(username, password) {
        this.token = (await Fetcher.Post(`${Server.API_BASE_URL}clients/${this.client}/token`, {}, {
            username,
            password
        })).token;

        Token.save(this.token);
        this.expTime = Token.extractExpTime(this.token);
    }

    async getAuthorizationHeader() {
        if(!Token.checkExpiryTime(this.token, Authenticator.REFRESH_SECONDS)) {
            console.log('wtf');
            await this.refreshToken();
        }

        return {
            Authorization: `Bearer ${this.token}`
        };
    }

    async refreshToken() {
        this.token = (await Fetcher.Get(`${Server.API_BASE_URL}token`, {
            Authorization: `Bearer ${this.token}`
        })).token;

        Token.save(this.token);
        this.expTime = Token.extractExpTime(this.token);
    }
}

Authenticator.REFRESH_SECONDS = 300;