<template>
    <div>
        <Descriptions>
            <DescriptionsItem :label="configs.label" class="label-width-18 border-bottom">
                <div v-if="configs.uiComponentType === 'TEXT'">{{ modelRef[configs.code] }}</div>
                <Select
                    v-else-if="['MULTI_SELECT', 'SINGLE_SELECT'].includes(configs.uiComponentType)"
                    :value="modelRef[configs.code]"
                    :mode="configs.uiComponentType === 'MULTI_SELECT' ? 'multiple' : null"
                    :options="configs.options"
                    @change="value => onChange(configs.code, value)"
                />
                <DatePicker
                    v-else-if="configs.uiComponentType === 'DATETIME'"
                    :value="modelRef[configs.code]"
                    show-time
                    :locale="locale"
                    @change="value => onChange(configs.code, value)"
                />
                <Switch
                    v-else-if="configs.uiComponentType === 'YES_NO'"
                    :checked="[true, 'true'].includes(modelRef[configs.code])"
                />
                <Upload
                    v-else-if="configs.uiComponentType === 'UPLOAD'"
                    :file-list="modelRef[configs.code]"
                    list-type="picture-card"
                    name="files"
                    action="/upload.do"
                    @change="value => onChange(configs.code, value)"
                >
                    <div>
                        <PlusOutlined />
                        <div class="ant-upload-text">Thêm ảnh</div>
                    </div>
                </Upload>
            </DescriptionsItem></Descriptions
        >
    </div>
</template>

<script setup>
import { inject, toRefs } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Descriptions, DatePicker, Select, Switch, Upload } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/vi_VN';
import { PlusOutlined } from '@ant-design/icons-vue';

const { Item: DescriptionsItem } = Descriptions;
const modelRef = inject('modelRef');
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
// const { name, parent } = toRefs(props);

const onChange = (field, data) => {
    console.log('data', data);
    store.commit('product/setAttributeData', { data, field });
};
</script>
