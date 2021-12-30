<template>
    <a-layout-sider v-model:collapsed="layoutState.collapsed" :trigger="null" collapsible :width="256">
        <div class="logo" />
        <a-menu
            v-model:openKeys="state.openKeys"
            v-model:selectedKeys="state.selectedKeys"
            mode="inline"
            theme="dark"
            :inline-collapsed="layoutState.collapsed"
        >
            <a-menu-item key="1">
                <template #icon>
                    <MailOutlined />
                </template>
                Navigation One
            </a-menu-item>
            <a-menu-item key="2">
                <template #icon>
                    <CalendarOutlined />
                </template>
                Navigation Two
            </a-menu-item>
            <a-sub-menu key="sub1">
                <template #icon>
                    <AppstoreOutlined />
                </template>
                <template #title>Navigation Three</template>
                <a-menu-item key="3">Option 3</a-menu-item>
                <a-menu-item key="4">Option 4</a-menu-item>
                <a-sub-menu key="sub1-2" title="Submenu">
                    <a-menu-item key="5">Option 5</a-menu-item>
                    <a-menu-item key="6">Option 6</a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <template #icon>
                    <SettingOutlined />
                </template>
                <template #title>Navigation Four</template>
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
                <a-menu-item key="9">Option 9</a-menu-item>
                <a-menu-item key="10">Option 10</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>

<script lang="ts">
export default {};
</script>

<script setup lang="ts">
// import { useState } from "#app";
import { ref, reactive } from 'vue';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';

// const { useCollapse } = useLayout();
const layoutState = useLayout();
const counter = useState<number>('counter', () => Math.round(Math.random() * 1000));
const state = reactive({
    theme: 'dark',
    selectedKeys: ['1'],
    openKeys: ['sub1'],
});
</script>