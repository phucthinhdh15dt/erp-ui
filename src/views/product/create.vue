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
import { provide, computed, watch, toRaw, reactive } from 'vue';
import { useStore } from 'vuex';
import { Row, Col, Form } from 'ant-design-vue';
import Head from '@/components/product/create/head.vue';
import General from '@/components/product/create/general.vue';
import AttributeWrapper from '@/components/product/create/attributeWrapper.vue';
import { rulesRef } from '@/composables/product/';
import { useGetAllManufacturer } from '@/composables/manufacturer';
import { useGetAllDistributor } from '@/composables/distributor';

const store = useStore();

const useForm = Form.useForm;
const modelRef = reactive(store.state.product.detail);
const form = useForm(modelRef, rulesRef);

provide('form', form);
provide('modelRef', modelRef);
provide('rulesRef', rulesRef);

useGetAllManufacturer();
useGetAllDistributor();

const attributeSets = computed(() => store.state.product.attributes);
// for dev
// modelRef.distributors = [
//     {
//         organization: null,
//         channel: [],
//     },
// ];
// modelRef.certifications = [
//     {
//         certificateId: '',
//         publishDate: null,
//         images: [],
//     },
// ];
watch(
    attributeSets,
    () => {
        const _attributeSets = [...toRaw(attributeSets.value.left), ...toRaw(attributeSets.value.right)];
        console.log('_attributeSets', _attributeSets);

        for (const _attributeSet of _attributeSets) {
            console.log('modelRef', modelRef);
            // giay_chung_nhan
            if (_attributeSet.groupCode === 'giay_chung_nhan') {
                modelRef.certifications = [
                    {
                        certificateId: '',
                        publishDate: null,
                        images: [],
                    },
                ];
            }
            // nha_phan_phoi
            else if (_attributeSet.groupCode === 'nha_phan_phoi') {
                modelRef.distributors = [];
            } else if (_attributeSet.isVariant) {
                modelRef.variants = _attributeSet.attributes.map(_ => _.code);
                continue;
            } else {
                for (const attr of _attributeSet.attributes) {
                    modelRef[attr.code] = attr.defaultValue;
                }
                // modelRef[_attributeSet.groupCode] = _attributeSet.attributes.reduce((acc, cur) => {
                //     acc[cur.code] = cur.defaultValue;

                //     return acc;
                // }, {});
            }
        }
    },
    { deep: true }
);
</script>
