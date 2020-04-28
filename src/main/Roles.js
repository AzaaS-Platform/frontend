export default class Roles {
    static fetch() {
        return Roles.data;
    }

    static getRoleById(id) {
        return Roles.data.find(e => e.id === id) ?? null;
    }
}

Roles.data = [
    {
        id: 1,
        name: 'test',
        privileges: ['r1', 'r2', 'r3']
    },
    {
        id: 2,
        name: "test2",
        privileges: ['r4', 'r5']
    },
    {
        id: 3,
        name: "test2",
        privileges: ['r4', 'r5']
    },
    {
        id: 4,
        name: "test2",
        privileges: ['r4', 'r5']
    },
    {
        id: 5,
        name: "test2",
        privileges: ['r4', 'r5']
    },
    {
        id: 6,
        name: "test2",
        privileges: ['r4', 'r5']
    },
];