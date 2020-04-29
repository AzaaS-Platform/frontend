import User from "../components/pages/users/User.vue";
import Users from "../components/pages/users/Users.vue";
import AddUser from "../components/pages/users/AddUser.vue";
import Roles from "../components/pages/roles/Roles.vue";
import AddRole from "../components/pages/roles/AddRole.vue";
import EditRole from "../components/pages/roles/EditRole.vue";

export default [
    { path: '/add-role', component: AddRole },
    { path: '/edit-role/:id?', component: EditRole },
    { path: '/roles/:page', component: Roles },
    { path: '/roles', redirect: '/roles/1' },
    { path: '/add-user', component: AddUser },
    { path: '/user/:id', component: User },
    { path: '/users/:page', component: Users },
    { path: '/users', redirect: '/users/1' },
    { path: '/', redirect: '/users' },
]