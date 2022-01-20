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
import { provide, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Row, Col, Form } from 'ant-design-vue';
import Head from '@/components/product/detail/head.vue';
import General from '@/components/product/detail/general.vue';
import AttributeWrapper from '@/components/product/create/attributeWrapper.vue';
import { modelRef, rulesRef, useGetProductDetail } from '@/composables/product/';

const store = useStore();
const route = useRoute();
const useForm = Form.useForm;
const { getProductDetail, result } = useGetProductDetail();

const productId = computed(() => route.params.id);
const attributeSets = computed(() => store.state.product.attributes);
// const modelRef = computed(() => store.state.product.detail);
const form = useForm(modelRef, rulesRef);

provide('form', form);
provide('modelRef', modelRef);
provide('rulesRef', rulesRef);

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
    result,
    () => {
        if (result.value) {
            console.log('result.value', result.value);
            // for (const key of Object.keys(result.value)) {
            Object.assign(modelRef, result.value);
            // }
        }
    },
    { deep: true }
);

// watch(
//     attributeSets,
//     () => {
//         const _attributeSets = [...toRaw(attributeSets.value.left), ...toRaw(attributeSets.value.right)];
//         console.log('_attributeSets', _attributeSets);

//         for (const _attributeSet of _attributeSets) {
//             console.log('modelRef', modelRef);
//             // giay_chung_nhan
//             if (_attributeSet.groupCode === 'giay_chung_nhan') {
//                 modelRef.certifications = [
//                     {
//                         certificateId: '',
//                         publishDate: null,
//                         images: [],
//                     },
//                 ];
//             }
//             // nha_phan_phoi
//             else if (_attributeSet.groupCode === 'nha_phan_phoi') {
//                 //  modelRef.distributors = [
//                 //     {
//                 //         certificateId: '',
//                 //         publishDate: null,
//                 //         images: [],
//                 //     },
//                 // ];
//             } else if (_attributeSet.isVariant) {
//                 modelRef.variants = _attributeSet.attributes.map(_ => _.code);
//                 continue;
//             } else {
//                 for (const attr of _attributeSet.attributes) {
//                     modelRef[attr.code] = attr.defaultValue;
//                 }
//                 // modelRef[_attributeSet.groupCode] = _attributeSet.attributes.reduce((acc, cur) => {
//                 //     acc[cur.code] = cur.defaultValue;

//                 //     return acc;
//                 // }, {});
//             }
//         }
//     },
//     { deep: true }
// );
</script>
