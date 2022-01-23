import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home/index.vue';
import { useAuth } from '@/composables/auth/index';
import { nextTick } from 'vue';

const Login = () => import('@/views/auth/login.vue');
const CategoryList = () => import('@/views/category/list.vue');

const Product = () => import('@/views/product/index.vue');
const ProductCreate = () => import('@/views/product/create.vue');
const ProductList = () => import('@/views/product/list.vue');
const ProductDetail = () => import('@/views/product/detail.vue');

const AttributeSet = () => import('@/views/attributeset/index.vue');
const AttributeSetCreate = () => import('@/views/attributeset/create.vue');
const AttributeSetDetail = () => import('@/views/attributeset/detail.vue');
const AttributeSetList = () => import('@/views/attributeset/list.vue');

const BrandList = () => import('@/views/brand/list.vue');

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
        ],
    },
    {
        path: '/product',
        name: 'Product',
        component: Product,
        meta: {
            title: 'Sản phẩm',
            breadCrumb: 'Sản phẩm',
            authRequired: true,
            layout: 'default',
        },
        children: [
            {
                name: 'ProductDetail',
                path: ':id',
                component: ProductDetail,
                meta: {
                    title: 'Chi tiết sản phẩm',
                    breadCrumb: 'Chi tiết sản phẩm',
                    authRequired: true,
                    layout: 'default',
                    // subMenuKey: '2',
                    // menuKey: '2.1',
                },
            },
            {
                name: 'ProductCreate',
                path: 'create',
                component: ProductCreate,
                meta: {
                    title: 'Sản phẩm',
                    breadCrumb: 'Khai báo sản phẩm',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '2',
                    menuKey: '2.1',
                },
            },
            {
                name: 'ProductList',
                path: 'list',
                component: ProductList,
                meta: {
                    title: 'Danh sách sản phẩm',
                    breadCrumb: 'Danh sách sản phẩm',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '2',
                    menuKey: '2.2',
                },
            },
        ],
    },
    {
        path: '/attribute-set',
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
                    subMenuKey: '3',
                    menuKey: '3.1',
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
                    subMenuKey: '3',
                    menuKey: '3.2',
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
                    subMenuKey: '3',
                    menuKey: '3.1',
                },
            },
        ],
    },
    {
        path: '/brand',
        name: 'BrandList',
        component: BrandList,
        meta: {
            title: 'Thương hiệu',
            authRequired: true,
            breadCrumb: 'Thương hiệu',
            layout: 'default',
        },
        children: [
            {
                name: 'BrandList',
                path: 'list',
                component: BrandList,
                meta: {
                    title: 'Danh sách thương hiệu',
                    breadCrumb: 'Danh sách thương hiệu',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '4',
                    menuKey: '4.1',
                },
            },
        ],
    },
    {
        path: '/attribute',
        name: 'AttributeList',
        component: AttributeList,
        meta: {
            title: 'Thuộc tính',
            breadCrumb: 'Thuộc tính',
            authRequired: true,
            layout: 'default',
        },
        children: [
            {
                name: 'AttributeList',
                path: 'list',
                component: AttributeList,
                meta: {
                    title: 'Danh sách thuộc tính',
                    breadCrumb: 'Danh sách thuộc tính',
                    authRequired: true,
                    layout: 'default',
                    subMenuKey: '5',
                    menuKey: '5.1',
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
