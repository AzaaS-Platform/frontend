import EditUser from "../components/pages/users/EditUser.vue";
import Users from "../components/pages/users/Users.vue";
import AddUser from "../components/pages/users/AddUser.vue";
import Roles from "../components/pages/roles/Roles.vue";
import AddRole from "../components/pages/roles/AddRole.vue";
import EditRole from "../components/pages/roles/EditRole.vue";
import Login from '../components/pages/login/Login.vue';
import NotFound from '../components/pages/errors/NotFound.vue';
import BasicLayout from '../components/elements/layout/BasicLayout.vue';

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
            {path: '*', component: NotFound},
            {path: '', component: NotFound},
        ]
    },
    {path: '/login', component: Login},
    {path: '/', redirect: '/login'},
    {path: '*', component: NotFound},
]