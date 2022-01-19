<template>
    <div>
        <Certification v-if="name === 'Giấy chứng nhận'">ahiih</Certification>
        <div v-else-if="isVariant">
            <div class="card-head-title">{{ name }}</div>
            <Card body-style="padding: 20px 20px 0 20px">
                <FormItem
                    v-for="(attribute, index) in attributes"
                    :key="index"
                    class="form-label-w-18"
                    :label="attribute.label"
                >
                    {{ attribute.options.map(_ => _.value).join(', ') }}
                </FormItem>
            </Card>
        </div>
        <div v-else>
            <div class="card-head-title">{{ name }}</div>
            <Card body-style="padding: 20px 20px 0 20px">
                <Attribute v-for="(attribute, index) in attributes" :key="index" :configs="attribute" :parent="code" />
            </Card>
        </div>
    </div>
</template>

<script setup>
import { inject, toRefs } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form } from 'ant-design-vue';
import Attribute from './attribute.vue';
import Certification from './certification.vue';

const { Item: FormItem } = Form;

const store = useStore();
const props = defineProps({
    name: {
        type: String,
        default: '',
    },
    code: {
        type: String,
        default: '',
    },
    isVariant: {
        type: Boolean,
        default: false,
    },
    attributes: {
        type: Array,
        default: () => [],
    },
});
const { name, code, isVariant, attributes } = toRefs(props);
const onBlurName = e => {
    store.commit('promotion/setName', e.target.value.trim());
};

const onChangeDescription = e => {
    store.commit('promotion/setDescription', e.target.value);
};
</script>
