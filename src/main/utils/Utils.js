export default class Utils {
    static handleLoginError(message) {
        this.$router.push(`/admin/login?error=${btoa(message)}`);
    }
}