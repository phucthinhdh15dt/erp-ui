<template>
    <div></div>
</template>
<script>
import { Row, Button } from 'ant-design-vue';
import { inject } from 'vue';

export default {
    components: {},
    setup() {
        const modelRef = inject('modelRef');
        const validateInfos = inject('validateInfos');

        const onCreateProps = () => {};
        return {
            modelRef,
            validateInfos,
            onCreateProps,
        };
    },
};
</script>
<style scoped lang="scss"></style>
