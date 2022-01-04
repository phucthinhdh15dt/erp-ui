<template>
    <div class="AttributeCreate">
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
import { defineComponent, computed, reactive, provide } from 'vue';
import { Form, Row, Col } from 'ant-design-vue';
import Head from '@/components/attribute/create/head.vue';
import Body from '@/components/attribute/create/body.vue';
import { useStore } from 'vuex';
import formRules from '@/composables/attribute/rules';

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
        const modelRef = computed(() => store.state.attribute.create.data);
        provide('modelRef', modelRef);

        const rulesRef = reactive(formRules);
        const form = useForm(modelRef, rulesRef);
        provide('form', form);

        const { resetFields, validate, validateInfos } = form;
        const onSubmit = () => {
            validate()
                .then(() => {
                    console.log(toRaw(modelRef));
                })
                .catch(err => {
                    console.log('error', err);
                });
        };
        provide('validateInfos', validateInfos);
        provide('resetFields', resetFields);
        return {
            validateInfos,
            resetFields,
            modelRef,
            onSubmit,
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
    },
});
</script>
