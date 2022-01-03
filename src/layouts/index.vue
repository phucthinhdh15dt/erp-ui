<template>
    <component :is="layout || 'div'">
        <slot />
    </component>
</template>

<script>
import { ref, watch, markRaw } from 'vue';
import AppLayoutDefault from './default.vue';
import { useRoute } from 'vue-router';

export default {
    name: 'Layout',
    setup() {
        const layout = ref();
        const route = useRoute();

        watch(
            () => route.meta?.layout || undefined,
            async metaLayout => {
                try {
                    const component = metaLayout && (await import(`./${metaLayout}.vue`));
                    layout.value = markRaw(component?.default || AppLayoutDefault);
                } catch (e) {
                    layout.value = markRaw(AppLayoutDefault);
                }
            },
            { immediate: true }
        );

        return { layout };
    },
};
</script>
