import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home/index.vue';
import { useAuth } from '@/composables/auth/index';
import { nextTick } from 'vue';

const Login = () => import('@/views/auth/login.vue');
const AttributeSet = () => import('@/views/attributeset/index.vue');
const AttributeSetCreate = () => import('@/views/attributeset/create.vue');
const AttributeSetDetail = () => import('@/views/attributeset/detail.vue');
const AttributeSetList = () => import('@/views/attributeset/list.vue');

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
        path: '/attributeset',
        name: 'AttributeSet',
        component: AttributeSet,
        meta: {
            title: 'Nhóm thuộc tính',
            breadCrumb: 'Nhóm huộc tính',
            authRequired: true,
            layout: 'default',
        },
        children: [
            {
                name: 'AttributeSetDetail',
                path: ':id',
                component: AttributeSetDetail,
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
                name: 'AttributeSetList',
                path: 'list',
                component: AttributeSetList,
                meta: {
                    title: 'Danh sách nhóm thuộc tính',
                    breadCrumb: 'Danh sách nhóm thuộc tính',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '1',
                    menuKey: '1.2',
                },
            },
            {
                name: 'AttributeSetCreate',
                path: 'create',
                component: AttributeSetCreate,
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
