<template>
    <Card>
        <Row>
            <Col :span="16">
                <Col :span="12">
                    <FormItem label="Ngành hàng">
                        <Select
                            v-model:value="modelRef.category"
                            label-in-value
                            allow-clear
                            placeholder="Chọn ngành hàng"
                            @change="onChangeCategory"
                        >
                            <Option v-for="item in categorys" :key="item.id" :value="item.name">
                                {{ item.name }}</Option
                            >
                        </Select>
                    </FormItem>
                    <FormItem label="Thương hiệu">
                        <Select
                            v-model:value="modelRef.brand"
                            label-in-value
                            allow-clear
                            placeholder="Chọn thương hiệu"
                            @change="onChangeBrand"
                        >
                            <Option v-for="item in brands" :key="item.id" :value="item.name"> {{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Col>
        </Row>
        <Row>
            <Col :span="16">
                <Col :span="12">
                    <FormItem label="Tên nhóm thuộc tính">
                        <Input
                            v-model:value="modelRef.name"
                            name="name"
                            :maxlength="80"
                            placeholder="Tên nhóm thuộc tính"
                        />
                    </FormItem>
                </Col>
            </Col>
        </Row>
    </Card>
</template>
<script>
import { Row, Card, Form, Select, Input, Col } from 'ant-design-vue';
import { ref, inject } from 'vue';

const { Item: FormItem } = Form;
const { Option } = Select;

export default {
    components: {
        Card,
        Row,
        Select,
        FormItem,
        Input,
        Col,
        Option,
    },
    setup() {
        const modelRef = inject('modelRef');

        const categorys = [
            {
                id: 1,
                name: 'Trang chủ',
            },
            {
                id: 1,
                name: 'Dưỡng da',
            },
        ];
        const onChangeCategory = () => {};
        const brands = [
            {
                id: 1,
                name: 'Trang chủ',
            },
            {
                id: 1,
                name: 'Dưỡng da',
            },
        ];
        const onChangeBrand = () => {};
        return {
            modelRef,
            categorys,
            onChangeCategory,
            brands,
            onChangeBrand,
        };
    },
};
</script>
<style scoped lang="scss"></style>
