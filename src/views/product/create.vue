<template>
    <Form label-align="left">
        <Row :gutter="20">
            <Col :span="24">
                <Head />
            </Col>
            <Col :span="14">
                <General></General>
                <AttributeWrapper :attributes="attributeSets.left" />
            </Col>

            <Col :span="10">
                <AttributeWrapper :attributes="attributeSets.right" />
            </Col>
        </Row>
    </Form>
</template>

<script setup>
import { ref, reactive, provide, computed, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import { Card, Row, Col, Form } from 'ant-design-vue';
import Head from '@/components/product/create/head.vue';
import General from '@/components/product/create/general.vue';
import AttributeWrapper from '@/components/product/create/attributeWrapper.vue';
import { modelRef, rulesRef } from '@/composables/product/';

const store = useStore();

const useForm = Form.useForm;
const form = useForm(modelRef, rulesRef);
provide('form', form);
provide('modelRef', modelRef);
provide('rulesRef', rulesRef);

const attributeSets = computed(() => store.state.product.attributes);
watch(
    attributeSets,
    () => {
        const _attributeSets = [...toRaw(attributeSets.value.left), ...toRaw(attributeSets.value.right)];
        console.log('_attributeSets', _attributeSets);

        for (const _attributeSet of _attributeSets) {
            console.log('modelRef', modelRef);
            for (const attr of _attributeSet.attributes) {
                modelRef[attr.code] = attr.defaultValue;
            }
            // modelRef[_attributeSet.groupCode] = _attributeSet.attributes.reduce((acc, cur) => {
            //     acc[cur.code] = cur.defaultValue;

            //     return acc;
            // }, {});
        }
    },
    { deep: true }
);
</script>
