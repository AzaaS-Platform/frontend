import Fetcher from "./Fetcher.js";

export default class Roles {
    static async fetch(clientId) {
        if(Roles.data === null) {
            let groups = await Fetcher.Get('group/getAll', {client:clientId});
            Roles.data = [];
            for(let group of groups) {
                Roles.data.push({
                    id: group.entity,
                    name: group.entity,
                    permissions: group.permissions
                });
            }
        }

        return Roles.data;
    }

    static async getRoleById(id, clientId) {
        if(Roles.data === null) {
            Roles.data = await Roles.fetch(clientId);
        }

        return Roles.data.find(e => e.id === id) ?? null;
    }
}

Roles.data = null;