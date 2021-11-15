import {createWebHashHistory, createRouter} from 'vue-router';
import Login from '../components/Login.vue'
import AdminMain from "../components/admin/main.vue"
import overallSituation from "../components/admin/overall-situation.vue"
import parkSituation from "../components/admin/park-situation.vue"
import userManager from "../components/admin/user-manage.vue"
import userSituation from "../components/admin/user-situation.vue"
import parkManager from "../components/admin/park-manage.vue"

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/admin',
        component: AdminMain,
        redirect: '/admin/overallSituation',
        children:[
            {
                path: 'overallSituation',
                component: overallSituation,
            },
            {
                path: 'parkSituation',
                component: parkSituation,
            },
            {
                path: 'userManager',
                component: userManager,
            },
            {
                path: 'userSituation',
                component: userSituation,
            },
            {
                path: 'parkManager',
                component: parkManager,
            }
        ]
    }
]

const router = new createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    if (to.path.startsWith("/admin")) {
        if (localStorage.getItem("token")) {
            next();
        } else {
            alert("请先登录！！");
            return next("/login");
        }
    } else {
        next();
    }
})
export default router