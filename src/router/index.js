import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home/index.vue';
import { useAuth } from '@/composables/auth/index';
import { nextTick } from 'vue';

const Login = () => import('@/views/auth/login.vue');
const CategoryList = () => import('@/views/category/list.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'ERP',
            authRequired: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Đăng nhập',
            layout: 'blank',
        },
    },
    {
        path: '/category',
        name: 'CategoryList',
        component: CategoryList,
        meta: {
            title: 'Ngành hàng',
            breadCrumb: 'Ngành hàng',
            authRequired: true,
            layout: 'default',
        },
        children: [
            // {
            //     name: 'OrderDetail',
            //     path: ':id',
            //     component: OrderDetail,
            //     meta: {
            //         title: 'Đơn hàng',
            //         breadCrumb: 'Chi tiết đơn hàng',
            //         authRequired: true,
            //         layout: 'default',
            //         subMenuKey: '1',
            //         menuKey: '1.3',
            //     },
            // },
            {
                name: 'OrderList',
                path: 'list',
                component: CategoryList,
                meta: {
                    title: 'Đơn hàng',
                    breadCrumb: 'Danh sách ngành hàng',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '1',
                    menuKey: '1.2',
                },
            },
            // {
            //     name: 'OrderCreate',
            //     path: 'create',
            //     component: OrderCreate,
            //     meta: {
            //         title: 'Đơn hàng',
            //         breadCrumb: 'Tạo đơn hàng',
            //         authRequired: true,
            //         layout: 'default',
            //         subMenuKey: '1',
            //         menuKey: '1.1',
            //     },
            // },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

const DEFAULT_TITLE = 'ERP';

router.beforeEach((to, from, next) => {
    const { isAuthenticated, _requirePassChange } = useAuth();
    const _isAuthenticated = isAuthenticated();

    if (to.meta.authRequired && !_isAuthenticated) {
        next({ name: 'Login' });
    } else if (to.name === 'Login' && _isAuthenticated) {
        next({ name: 'Home' });
    } else if (to.name !== 'ChangePassword' && _isAuthenticated && _requirePassChange.value) {
        next({ name: 'ChangePassword' });
    } else {
        next();
    }
    nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

export default router;
