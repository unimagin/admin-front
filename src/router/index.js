import {createWebHashHistory, createRouter} from 'vue-router';
import Login from '../components/Login.vue'
import AdminMain from "../components/admin/main.vue"

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
        component: AdminMain
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