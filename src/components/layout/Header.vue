<template>
    <LayoutHeader>
        <TopBar :not-slide-ref="notSlide" />
    </LayoutHeader>
</template>

<script>
import { toRefs } from 'vue';
import { Layout } from 'ant-design-vue';
import TopBar from '@/components/layout/TopBar.vue';
const { Header: LayoutHeader } = Layout;

export default {
    components: {
        LayoutHeader,
        TopBar,
    },
    props: {
        notSlideRef: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { notSlideRef: notSlide } = toRefs(props);
        return { notSlide };
    },
};
</script>

<style lang="scss">
.ant-layout-header {
    height: 48px;
    padding: 0;
    background: #fff;
    line-height: 48px;
    width: calc(100%);
    position: fixed;
    z-index: 2;
    left: 0;
}
</style>
