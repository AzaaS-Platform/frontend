import EditUser from "../components/pages/users/EditUser.vue";
import Users from "../components/pages/users/Users.vue";
import AddUser from "../components/pages/users/AddUser.vue";
import Roles from "../components/pages/roles/Roles.vue";
import AddRole from "../components/pages/roles/AddRole.vue";
import EditRole from "../components/pages/roles/EditRole.vue";
import Login from '../components/pages/login/Login.vue';
import NotFound from '../components/pages/errors/NotFound.vue';
import BasicLayout from '../components/elements/layout/BasicLayout.vue';
import Register from '../components/pages/login/Register.vue';
import Settings from '../components/pages/settings/Settings.vue';

export default [
    {
        path: '/dashboard', component: BasicLayout,
        children: [
            {path: 'add-role', component: AddRole},
            {path: 'edit-role/:id?', component: EditRole},
            {path: 'roles/:page', component: Roles},
            {path: 'roles', redirect: '/dashboard/roles/1'},
            {path: 'add-user', component: AddUser},
            {path: 'edit-user/:id', component: EditUser},
            {path: 'users/:page', component: Users},
            {path: 'users', redirect: '/dashboard/users/1'},
            {path: 'settings', component: Settings},
            {path: '*', component: NotFound},
            {path: '', component: NotFound},
        ]
    },
    {
        path: '/admin', component: BasicLayout,
        children: [
            {path: 'login', component: Login},
            {path: 'register', component: Register},
            {path: 'error', component: NotFound},
        ]
    },
    {path: '/', redirect: '/admin/login'},
    {path: '*', redirect: '/admin/error'},
]