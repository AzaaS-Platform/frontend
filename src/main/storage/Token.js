export default class Token {
    static extractExpTime(token) {
        const data = JSON.parse(atob(token.split('.')[1]));
        return data.exp;
    }

    static save(token) {
        localStorage.setItem(Token.STORAGE_KEY, token);
    }

    static restore() {
        return localStorage.getItem(Token.STORAGE_KEY);
    }

    static remove() {
        localStorage.removeItem(Token.STORAGE_KEY);
    }

    static checkExpiryTime(token, timeInSeconds = 0) {
        return Token.extractExpTime(token) - new Date() / 1000 > timeInSeconds;
    }
}

Token.STORAGE_KEY = 'token';