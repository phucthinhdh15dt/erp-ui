<template>
    <Layout class="LayoutBlank">
        <LayoutContent class="LayoutBlank__Content">
            <slot />
        </LayoutContent>
    </Layout>
</template>
<script>
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
const { Content: LayoutContent } = Layout;

export default defineComponent({
    components: {
        Layout,
        LayoutContent,
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.LayoutBlank {
    &__Content {
        height: 100vh;
    }
}
</style>
