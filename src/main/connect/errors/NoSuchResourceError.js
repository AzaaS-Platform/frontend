export default class NoSuchResourceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoSuchResourceError';
    }
}