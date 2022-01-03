<template>
    <div id="app">
        <Layout>
            <Spin size="large" :spinning="loading">
                <router-view />
            </Spin>
        </Layout>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Spin } from 'ant-design-vue';

export default {
    components: {
        Spin,
    },
    setup() {
        const store = useStore();
        const loading = computed(() => store.state.layout.loading);

        return { loading };
    },
};
</script>

<style lang="scss">
@import '@/assets/stylesheets/global.scss';
</style>
