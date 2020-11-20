import Fetcher from './Fetcher.js';
import Server from '../utils/Server.js';
import Token from '../storage/Token.js';
import UserNotAuthenticatedError from './errors/UserNotAuthenticatedError.js';

export default class Authenticator {
    constructor(client, token) {
        this.client = client;
        this.token = token;
        if(this.token !== null && Token.extractExpTime(this.token)) {
            this.expTime = Token.extractExpTime(this.token);
        }
    }

    async authenticate(username, password, token = undefined) {
        this.token = (await Fetcher.Post(`${Server.API_BASE_URL}token`, {
            "x-azaas-client": this.client
        }, {
            username,
            password,
            token
        })).token;

        Token.save(this.token);
        this.expTime = Token.extractExpTime(this.token);
    }

    async getAuthorizationHeader() {
        if(this.token === null) throw new UserNotAuthenticatedError("User is not authenticated")

        if(!Token.checkExpiryTime(this.token, Authenticator.REFRESH_SECONDS)) {
            await this.refreshToken();
        }

        return {
            Authorization: `Bearer ${this.token}`,
            "x-azaas-client": this.client
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