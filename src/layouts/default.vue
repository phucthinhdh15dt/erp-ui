<template>
    <Layout class="LayoutDefault">
        <SideMenu :sub-menu-key-ref="subMenuKeyRef" :menu-key-ref="menuKeyRef" />
        <Layout>
            <Header />
            <Breadcrumb :data="crumbs" class="LayoutDefault__Breadcrumb" />
            <LayoutContent class="LayoutDefault__Content">
                <slot />
            </LayoutContent>
        </Layout>
    </Layout>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { Layout } from 'ant-design-vue';
import Header from '@/components/layout/Header.vue';
import SideMenu from '@/components/layout/SideMenu.vue';
import Breadcrumb from '@/components/layout/Breadcrumb.vue';

const { Content: LayoutContent } = Layout;

export default defineComponent({
    components: {
        SideMenu,
        Layout,
        Header,
        LayoutContent,
        Breadcrumb,
    },
    setup() {
        const route = useRoute();
        const crumbs = computed(() => {
            let pathArray = route.path.split('/');
            pathArray.shift();
            if (!pathArray[0]) return [];

            let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
                breadcrumbArray.push({
                    path: path,
                    to: breadcrumbArray[idx - 1] ? '/' + breadcrumbArray[idx - 1].path + '/' + path : '/' + path,
                    text: route.matched[idx].meta.breadCrumb || path,
                });
                return breadcrumbArray;
            }, []);

            return breadcrumbs;
        });

        const menuKeyRef = computed(() => {
            return route.meta.menuKey;
        });

        const subMenuKeyRef = computed(() => {
            return route.meta.subMenuKey;
        });

        return {
            crumbs,
            subMenuKeyRef,
            menuKeyRef,
        };
    },
});
</script>

<style lang="scss" scoped>
.LayoutDefault {
    &__Content {
        margin: $primary-margin;
        margin-right: 0 !important;
    }

    &__Breadcrumb {
        margin: $primary-margin $primary-margin 0 $primary-margin;
        background: #f0f2f5;
    }
}
</style>
