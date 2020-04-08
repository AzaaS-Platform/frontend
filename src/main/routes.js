import User from "../components/pages/User.vue";
import Users from "../components/pages/Users.vue";
import AddUser from "../components/pages/AddUser.vue";
import Role from "../components/pages/Role.vue";
import Roles from "../components/pages/Roles.vue";
import AddRole from "../components/pages/AddRole.vue";

export default [
    { path: '/add-role', component: AddRole },
    { path: '/role/:id', component: Role },
    { path: '/roles/:page', component: Roles },
    { path: '/roles', redirect: '/roles/1' },
    { path: '/add-user', component: AddUser },
    { path: '/user/:id', component: User },
    { path: '/users/:page', component: Users },
    { path: '/users', redirect: '/users/1' },
    { path: '/', redirect: '/users' },
]