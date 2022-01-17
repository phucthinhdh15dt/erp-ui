<template>
    <LayoutSider :collapsed="collapsed" :trigger="null" collapsible class="LayoutSider" width="208">
        <router-link to="/">
            <div class="LayoutSider__Logo">
                <img src="@/assets/images/logo_color.svg" width="140" />&nbsp;
                <div>ERP</div>
            </div>
        </router-link>
        <Menu :selected-keys="[menuKey]" :open-keys="openKeys" theme="dark" mode="inline" class="LayoutSider__Menu">
            <!-- <template #title>Quản lý ngành hàng</template> -->
            <router-link to="/category">
                <MenuItem key="1.1">
                    <template #icon> <FormOutlined /> </template> Quản lý ngành hàng
                </MenuItem>
            </router-link>
            <!-- <SubMenu key="sub1">
                <template #icon>
                    <FormOutlined />
                </template>
                <template #title>Quản lý sản phẩm</template>
                <router-link to="/product/create">
                    <MenuItem key="1.1">Khai báo sản phẩm</MenuItem>
                </router-link>
                <router-link to="/product/list">
                    <MenuItem key="1.2">Danh sách sản phẩm</MenuItem>
                </router-link>
            </SubMenu> -->
            <!--   <router-link to="/order/list">
                    <MenuItem key="1.2">Danh sách đơn hàng</MenuItem>
                </router-link> -->
            <SubMenu key="3">
                <template #icon>
                    <FormOutlined />
                </template>
                <template #title>QL nhóm thuộc tính</template>
                <router-link to="/attribute-set/create">
                    <MenuItem key="3.1">Tạo nhóm thuộc tính</MenuItem>
                </router-link>
                <router-link to="/attribute-set/list">
                    <MenuItem key="3.2">DS nhóm thuộc tính</MenuItem>
                </router-link>
            </SubMenu>
            <router-link to="/brand">
                <MenuItem key="4.1">
                    <template #icon> <FormOutlined /> </template> Quản lý thương hiệu
                </MenuItem>
            </router-link>
            <router-link to="/attribute">
                <MenuItem key="5.1">
                    <template #icon> <FormOutlined /> </template> Quản lý thuộc tính
                </MenuItem>
            </router-link>
        </Menu>
    </LayoutSider>
</template>

<script>
import { defineComponent, reactive, toRefs, watch, computed } from 'vue';
import store from '@/store';
import { FormOutlined } from '@ant-design/icons-vue';
import { Menu, Layout } from 'ant-design-vue';

const { SubMenu, Item: MenuItem } = Menu;
const { Sider: LayoutSider } = Layout;

export default defineComponent({
    components: {
        FormOutlined,
        Menu,
        MenuItem,
        SubMenu,
        LayoutSider,
    },
    props: {
        subMenuKeyRef: {
            default: () => '',
            type: String,
        },
        menuKeyRef: {
            default: () => '',
            type: String,
        },
    },
    setup(props) {
        const { menuKeyRef: menuKey, subMenuKeyRef: subMenuKey } = toRefs(props);
        const state = reactive({
            collapsed: false,
            selectedKeys: menuKey.value ? menuKey.value : [],
            preOpenKeys: menuKey.value ? menuKey.value : [],
        });
        const openKeys = computed(() => (subMenuKey.value ? subMenuKey.value.split(',') : []));

        watch(
            () => state.openKeys,
            (val, oldVal) => {
                state.preOpenKeys = oldVal;
            }
        );

        const toggleCollapsed = () => {
            state.collapsed = !state.collapsed;
            state.openKeys = state.collapsed ? [] : state.preOpenKeys;
        };
        state.collapsed = computed(() => store.state.layout.menuCollapsed);

        return {
            ...toRefs(state),
            toggleCollapsed,
            menuKey,
            subMenuKey,
            openKeys,
        };
    },
});
</script>

<style lang="scss">
.ant-menu-item {
    color: $primary-color !important;
}

.LayoutSider {
    background: #fff;
    border-right: 1px solid #ddd;
    min-height: 100vh;
    z-index: 3;

    &__Wrapper {
        position: fixed;
        left: 0;
        // overflow: auto;
    }

    &__Logo {
        height: 48px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;
        font-size: 20px;

        div {
            margin-top: -4px;
            font-weight: 600;
            color: $primary-color;
        }
    }

    &__Menu {
        background-color: #fff !important;

        .ant-menu-title-content,
        .ant-menu-item-icon {
            color: $primary-color;
            font-weight: 500;
        }

        .ant-menu-item {
            margin: 0 !important;
            height: 38px;
            line-height: 38px;
        }

        > .ant-menu-item {
            padding-left: 12px !important;
        }

        .ant-menu-item-selected {
            background-color: $primary-background-color !important;
            border-right: 1px solid $primary-color;

            .ant-menu-title-content {
                color: $primary-color;
                font-weight: 500;
            }
        }

        .ant-menu-sub,
        .ant-menu-item-only-child {
            background-color: #fff !important;

            &.ant-menu-item-selected {
                background-color: $primary-background-color !important;
                border-right: 2px solid $primary-color;
            }
        }

        // .ant-menu-submenu-title,
        // .ant-menu-item-only-child {
        //     padding-left: $primary-padding !important;
        // }

        .ant-menu-submenu-arrow::before,
        .ant-menu-submenu-arrow::after {
            background: $primary-color !important;
        }
    }
}

.ant-menu-submenu {
    .ant-menu-sub {
        background-color: #fff !important;
    }

    .ant-menu-item-selected {
        background-color: $primary-background-color !important;

        .ant-menu-title-content {
            color: $primary-color;
            font-weight: 500;
        }
    }

    span {
        color: $primary-color !important;
        font-weight: 500;
    }

    .ant-menu-submenu {
        .ant-menu-sub {
            .ant-menu-title-content {
                padding-left: 10px;
            }
        }
    }
}

.ant-layout-sider-collapsed {
    .LayoutSider__Logo {
        display: block;
        text-align: center;

        img {
            width: 80%;
            height: auto;
        }

        > div {
            font-size: 14px;
        }
    }

    .ant-menu-submenu-vertical .ant-menu-submenu-title {
        padding-left: calc(50% - 16px / 2) !important;
    }

    .ant-menu-inline-collapsed {
        > .ant-menu-item {
            padding-left: calc(50% - 16px / 2) !important;
        }
    }
}
</style>
