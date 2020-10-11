export default class UserNotAuthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotAuthenticatedError';
    }
}