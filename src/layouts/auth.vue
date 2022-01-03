<template>
    <Layout class="LayoutAuth">
        <Header :not-slide-ref="true" />
        <LayoutContent class="LayoutAuth__Content">
            <slot />
        </LayoutContent>
    </Layout>
</template>
<script>
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import Header from '@/components/layout/Header.vue';
const { Content: LayoutContent } = Layout;

export default defineComponent({
    components: {
        Layout,
        LayoutContent,
        Header,
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.LayoutAuth {
    &__Content {
        height: calc(100vh - 48px);
    }
}
</style>
