<template>
    <div class="ActionArea">
        <Button type="primary"> Tạo mới </Button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';

export default defineComponent({
    name: 'ActionArea',
    components: { Button },
    setup() {
        return {};
    },
});
</script>

<style lang="scss">
.ActionArea {
    width: fit-content;
    flex: 1;
    justify-content: end;
    text-align: right;

    &--delete {
        margin-right: 1rem;
    }
}
</style>
