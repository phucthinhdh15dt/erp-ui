<template>
    <div class="AttributeDetail">
        <Form :label-col="labelCol" :wrapper-col="wrapperCol" label-align="left">
            <Row :gutter="16">
                <Col :span="24">
                    <Head />
                </Col>
            </Row>
            <Row :gutter="16">
                <Col :span="24">
                    <Body />
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import { defineComponent, watch, computed, provide, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Row, Col, Form } from 'ant-design-vue';
import Head from '@/components/attribute/detail/head.vue';
import Body from '@/components/attribute/detail/body.vue';
import { useGetAttribute } from '@/composables/attribute/create';
import { rulesDetail } from '@/composables/attribute/rules';

import { useStore } from 'vuex';

const useForm = Form.useForm;

export default defineComponent({
    name: 'AttributeCreate',
    components: {
        Form,
        Row,
        Col,
        Head,
        Body,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const { getAttributeId } = useGetAttribute();
        const attributeId = computed(() => route.params.id);
        const modelRef = computed(() => store.state.attribute.detail.data);
        provide('attributeId', attributeId);

        watch(
            attributeId,
            () => {
                if (attributeId.value) {
                    getAttributeId(attributeId.value);
                }
            },
            { immediate: true }
        );

        const rulesRef = reactive(rulesDetail);
        const form = useForm(modelRef, rulesRef);
        provide('form', form);

        return {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
    },
});
</script>
