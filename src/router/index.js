import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home/index.vue';
import { useAuth } from '@/composables/auth/index';
import { nextTick } from 'vue';

const Login = () => import('@/views/auth/login.vue');
const Attribute = () => import('@/views/attribute/index.vue');
const AttributeCreate = () => import('@/views/attribute/create.vue');
const AttributeDetail = () => import('@/views/attribute/detail.vue');
const AttributeList = () => import('@/views/attribute/list.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Blissbery - ERP',
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
        path: '/attribute',
        name: 'Attribute',
        component: Attribute,
        meta: {
            title: 'Thuộc tính',
            breadCrumb: 'Thuộc tính',
            authRequired: true,
            layout: 'default',
        },
        children: [
            {
                name: 'AttributeDetail',
                path: ':id',
                component: AttributeDetail,
                meta: {
                    title: 'Chi tiết nhóm thuộc tính',
                    breadCrumb: 'Chi tiết nhóm thuộc tính',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '1',
                    menuKey: '1.3',
                },
            },
            {
                name: 'AttributeList',
                path: 'list',
                component: AttributeList,
                meta: {
                    title: 'Danh sách thuộc tính',
                    breadCrumb: 'Danh sách thuộc tính',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '1',
                    menuKey: '1.2',
                },
            },
            {
                name: 'AttributeCreate',
                path: 'create',
                component: AttributeCreate,
                meta: {
                    title: 'Tạo nhóm thuộc tính',
                    breadCrumb: 'Tạo nhóm thuộc tính',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '1',
                    menuKey: '1.1',
                },
            },
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
