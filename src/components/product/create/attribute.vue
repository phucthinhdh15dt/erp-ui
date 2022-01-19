<template>
    <div>
        <FormItem :label="configs.label" class="form-label-w-18">
            <Input v-if="configs.uiComponentType === 'TEXT'" v-model:value="modelRef[configs.code]" />
            <Select
                v-else-if="['MULTI_SELECT', 'SINGLE_SELECT'].includes(configs.uiComponentType)"
                v-model:value="modelRef[configs.code]"
                :mode="configs.uiComponentType === 'MULTI_SELECT' ? 'multiple' : null"
                :options="configs.options"
            />
            <DatePicker
                v-else-if="configs.uiComponentType === 'DATETIME'"
                v-model:value="modelRef[configs.code]"
                show-time
                :locale="locale"
            />
            <Switch v-else-if="configs.uiComponentType === 'YES_NO'" v-model:checked="modelRef[configs.code]" />
        </FormItem>
    </div>
</template>

<script setup>
import { inject, toRefs } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form, DatePicker, Select, Switch } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/vi_VN';

const { Item: FormItem } = Form;
const modelRef = inject('modelRef');
console.log('modelRef 2', modelRef);
const store = useStore();
const props = defineProps({
    configs: {
        type: Object,
        default: () => {},
    },
    parent: {
        type: String,
        default: '',
    },
});
const { name, parent } = toRefs(props);
const onBlurName = e => {
    store.commit('promotion/setName', e.target.value.trim());
};

const onChangeDescription = e => {
    store.commit('promotion/setDescription', e.target.value);
};
</script>
