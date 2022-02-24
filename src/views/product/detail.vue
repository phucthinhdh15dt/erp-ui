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
import { provide, computed, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Row, Col, Form } from 'ant-design-vue';
import Head from '@/components/product/detail/head.vue';
import General from '@/components/product/detail/general.vue';
import AttributeWrapper from '@/components/product/detail/attributeWrapper.vue';
import { rulesRef, useGetProductDetail } from '@/composables/product/';
import { useGetProductCertifications } from '@/composables/certification/';
import { isEmpty, isPlainObject } from 'lodash/fp';
import { useGetAllManufacturer } from '@/composables/manufacturer';
import { useGetAllDistributor } from '@/composables/distributor';

const store = useStore();
const route = useRoute();
const useForm = Form.useForm;
const { getProductDetail } = useGetProductDetail();
const { getProductCertifications } = useGetProductCertifications();
useGetAllManufacturer();
useGetAllDistributor();

const productId = computed(() => route.params.id);
const attributeSets = computed(() => store.state.product.attributes);
const modelRef = computed(() => store.state.product.detail);
const certifications = computed(() => store.state.product.detail.certifications);
const form = useForm(modelRef, rulesRef);

provide('form', form);
provide('modelRef', modelRef);
provide('rulesRef', rulesRef);
provide('productId', productId);

watch(
    productId,
    () => {
        if (productId.value) {
            getProductDetail(productId.value);
        }
    },
    { immediate: true }
);

watch(
    certifications,
    () => {
        if (certifications.value) {
            if (!isEmpty(certifications.value) && !isPlainObject(certifications.value[0])) {
                getProductCertifications(toRaw(certifications.value));
            }
        }
    },
    { deep: true }
);
</script>
