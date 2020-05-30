export default class Users {
    static fetch() {
        return Users.data;
    }

    static getUserById(id) {
        return Users.data.find(e => e.id === id) ?? null;
    }
}

Users.data = [
    {
        id: 1,
        name: 'User 1',
        roles: ['r1', 'r2', 'r3']
    },
    {
        id: 2,
        name: "User 2",
        roles: ['r4', 'r5']
    },
    {
        id: 3,
        name: "User 3",
        roles: ['r4', 'r5']
    },
    {
        id: 4,
        name: "User 4",
        roles: ['r4', 'r5']
    },
    {
        id: 5,
        name: "User 5",
        roles: ['r4', 'r5']
    },
    {
        id: 6,
        name: "User 6",
        roles: ['r4', 'r5']
    },
];