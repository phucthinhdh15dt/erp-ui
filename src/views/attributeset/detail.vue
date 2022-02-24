<template>
    <div class="AttributeSetDetail">
        <Spin tip="Đang tải..." :spinning="loading">
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
        </Spin>
    </div>
</template>
<script>
import { defineComponent, watch, computed, provide, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Row, Col, Form, Spin } from 'ant-design-vue';
import Head from '@/components/attributeset/detail/head.vue';
import Body from '@/components/attributeset/detail/body.vue';
import { useGetAttributeSet } from '@/composables/attributeset/create';
import { rulesDetail } from '@/composables/attributeset/rules';

import { useStore } from 'vuex';

const useForm = Form.useForm;

export default defineComponent({
    name: 'AttributeSetDetail',
    components: {
        Form,
        Row,
        Col,
        Head,
        Body,
        Spin,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const { getAttributeSetId, loading } = useGetAttributeSet();
        const attributeSetId = computed(() => route.params.id);
        const modelRef = computed(() => store.state.attributeSet.detail.data);
        provide('attributeSetId', attributeSetId);

        watch(
            attributeSetId,
            () => {
                if (attributeSetId.value) {
                    getAttributeSetId(attributeSetId.value);
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
            loading,
        };
    },
});
</script>
