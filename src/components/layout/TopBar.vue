<template>
    <div class="TopNav ant-row" style="row-gap: 0px">
        <div v-if="!notSlide" class="ant-col" style="flex: 0 0 50px">
            <MenuUnfoldOutlined
                v-if="menuCollapsed"
                class="trigger"
                style="font-size: 19px; margin-left: 100px"
                @click="sideLayoutCollapsed"
            />
            <MenuFoldOutlined
                v-else
                class="trigger"
                style="font-size: 19px; margin-left: 234px"
                @click="sideLayoutCollapsed"
            />
        </div>
        <div class="ant-col" style="flex: 1 1 auto">
            <div class="nav navbar-nav TopNav--Right">
                <div class="TopNav__Item ant-col">
                    <SearchOutlined style="font-size: 19px" />
                </div>
                <div class="TopNav__Item ant-col">
                    <SoundOutlined style="font-size: 19px" />
                </div>
                <div class="TopNav__Item ant-col">
                    <Dropdown>
                        <div class="ant-dropdown-link" @click.prevent>
                            <Avatar :src="userProfile.avatar" size="small" style="margin-top: -3px" />
                            {{ userProfile.username }}
                            <DownOutlined />
                        </div>
                        <template #overlay>
                            <Menu>
                                <router-link to="/profile"> <MenuItem key="1">Thông tin cá nhân</MenuItem></router-link>
                                <router-link to="/change-password">
                                    <MenuItem key="1">Đổi mật khẩu</MenuItem></router-link
                                >
                                <MenuItem key="2" @click="onLogout">Đăng xuất</MenuItem>
                            </Menu>
                        </template>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { reactive, toRefs, computed } from 'vue';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined,
    SoundOutlined,
    DownOutlined,
} from '@ant-design/icons-vue';
import { Dropdown, Menu, Avatar } from 'ant-design-vue';
import { useAuth } from '@/composables/auth/index';
import { useRouter } from 'vue-router';

const { Item: MenuItem } = Menu;

export default {
    name: 'TopBar',
    components: {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        SearchOutlined,
        SoundOutlined,
        Dropdown,
        Menu,
        MenuItem,
        DownOutlined,
        Avatar,
    },
    props: {
        notSlideRef: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { notSlideRef: notSlide } = toRefs(props);
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            menuCollapsed: false,
            searchValue: '',
        });
        const { logout, getUserProfile } = useAuth();
        const userProfile = computed(() => getUserProfile());

        const onLogout = () => {
            logout();
            router.push({ name: 'Login' });
        };

        const onSearch = textValue => {
            searchValue = textValue;
        };

        const sideLayoutCollapsed = () => {
            state.menuCollapsed = !state.menuCollapsed;
            store.dispatch('layout/getMenuCollapsed', state.menuCollapsed);
        };

        return {
            ...toRefs(state),
            notSlide,
            onSearch,
            sideLayoutCollapsed,
            onLogout,
            userProfile,
        };
    },
};
</script>

<style lang="scss" scoped>
.TopNav {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
        line-height: initial;
    }

    &.ant-row {
        display: flex;
        flex-flow: row wrap;
    }

    &--Right {
        text-align: right;
    }

    &__Item {
        display: inline-block;
        margin-right: 30px;
        cursor: pointer;
        vertical-align: middle;
    }

    .anticon-menu-fold,
    .anticon-menu-unfold {
        color: $primary-color;
    }
}
</style>
