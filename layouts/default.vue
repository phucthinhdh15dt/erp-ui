<template>
    <a-layout class="layout-default">
        <LayoutSideMenu></LayoutSideMenu>
        <a-layout>
            <LayoutHeader></LayoutHeader>
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px',
                }"
            >
                <slot></slot>
                {{ data }}
                {{ result }}
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
export default {
    components: {},
};
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTestComposable } from '@/composables/useTest';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';

const { getTest, result } = useTestComposable();
onMounted(() => {
    console.log('Component is mounted!');
    getTest();
});
const collapsed = ref<boolean>(false);
</script>

<style lang="scss">
.layout-default {
    height: 100vh;

    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
    }

    .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.3);
        margin: 16px;
    }
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>