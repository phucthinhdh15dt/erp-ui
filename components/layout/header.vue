<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="layoutState.collapsed"
      class="trigger"
      @click="() => (layoutState.collapsed = !layoutState.collapsed)"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="() => (layoutState.collapsed = !layoutState.collapsed)"
    />
  </a-layout-header>
</template>

<script lang="ts">
export default {};
</script>

<script setup lang="ts">
import { ref } from "vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
const layoutState = useLayout();

// const collapsed = useCollapse();
</script>