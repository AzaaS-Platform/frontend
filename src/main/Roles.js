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
        permissions: ['x/y/z', 'q/w/e']
    },
    {
        id: 2,
        name: "test2",
        permissions: ['x/y/z', 'q/w/e']
    },
    {
        id: 3,
        name: "test2",
        permissions: ['f/o/o', 'foo/bar/qwe', 'q/w/e']
    },
    {
        id: 4,
        name: "test2",
        permissions: ['x/y/z', 'q/w/e']
    },
    {
        id: 5,
        name: "test2",
        permissions: ['x/y/z', 'q/w/e']
    },
    {
        id: 6,
        name: "test2",
        permissions: ['xcv/yui']
    },
];