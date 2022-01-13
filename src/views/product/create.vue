<template>
    <Form label-align="left">
        <Row :gutter="20">
            <Col :span="14">
                <General></General>
                <Seo></Seo>
                <Variant></Variant>
            </Col>

            <Col :span="10">
                <Attribute></Attribute>
            </Col>
        </Row>
    </Form>
</template>

<script setup>
import { ref, reactive, provide } from 'vue';
import { Card, Row, Col, Form } from 'ant-design-vue';
import General from '@/components/product/create/general.vue';
import Seo from '@/components/product/create/seo.vue';
import Variant from '@/components/product/create/variant.vue';
import Attribute from '@/components/product/create/attribute.vue';

const useForm = Form.useForm;

const modelRef = reactive({
    category: '',
    brand: '',
});
const rulesRef = reactive({
    category: [
        {
            required: true,
            message: 'Please input Activity name',
        },
        {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur',
        },
    ],
    brand: [
        {
            required: true,
            message: 'Please select region',
        },
    ],
});

const form = useForm(modelRef, rulesRef);
provide('form', form);
provide('modelRef', modelRef);
provide('rulesRef', rulesRef);
</script>