export default class Client {
    static save(client) {
        localStorage.setItem(Client.STORAGE_KEY, client);
    }

    static restore() {
        return localStorage.getItem(Client.STORAGE_KEY);
    }

    static remove() {
        localStorage.removeItem(Client.STORAGE_KEY);
    }
}

Client.STORAGE_KEY = 'client';