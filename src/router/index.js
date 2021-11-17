import {createWebHashHistory, createRouter} from 'vue-router';

const Login = () => import  ( "../components/Login.vue")
const MainIndex = () => import  ( "../components/admin/main-index.vue")
const overallSituation = () => import  ( "../components/admin/overall-situation.vue")
const parkSituation = () => import  ( "../components/admin/park-situation.vue")
const userManager = () => import  ( "../components/admin/user-manage.vue")
const userSituation = () => import  ( "../components/admin/user-situation.vue")
const parkManager = () => import  ( "../components/admin/park-manage.vue")

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
        component: MainIndex,
        redirect: '/admin/overallSituation',
        children: [
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
    }
)
export default router