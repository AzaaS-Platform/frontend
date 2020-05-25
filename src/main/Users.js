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
        roles: ['x/y/z', 'q/w/e']
    },
    {
        id: 2,
        name: "User 2",
        roles: ['x/y/z', 'q/w/e']
    },
    {
        id: 3,
        name: "User 3",
        roles: ['f/o/o', 'foo/bar/qwe', 'q/w/e']
    },
    {
        id: 4,
        name: "User 4",
        roles: ['x/y/z', 'q/w/e']
    },
    {
        id: 5,
        name: "User 5",
        roles: ['x/y/z', 'q/w/e']
    },
    {
        id: 6,
        name: "User 6",
        roles: ['xcv/yui']
    },
];