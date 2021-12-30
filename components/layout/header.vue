<template>
    <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="layoutState.collapsed"
            class="trigger"
            @click="() => (layoutState.collapsed = !layoutState.collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (layoutState.collapsed = !layoutState.collapsed)" />
        {{ counter }}
    </a-layout-header>
</template>

<script lang="ts">
export default {};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
const counter = useState('counter');
const test = useTest();
const layoutState = useLayout();
</script>