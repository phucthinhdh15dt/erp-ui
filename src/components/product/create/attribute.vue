<template>
    <div>
        <div class="card-head-title">Thuộc tính sản phẩm</div>
        <Card body-style="padding: 20px 20px 0 20px">
            <FormItem label="Tên chương trình" class="label-width-18">
                <Input @blur="onBlurName" />
            </FormItem>
            <FormItem label="Mô tả" class="label-width-18 no-required-label">
                <Input @change="onChangeDescription" />
            </FormItem>
        </Card>
    </div>
</template>

<script>
import { inject } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form } from 'ant-design-vue';

const { Item: FormItem } = Form;

export default {
    name: 'OrderDetailGeneral',
    components: {
        Card,
        Input,
        FormItem,
    },
    setup() {
        const store = useStore();
        // const form = inject('form');
        // const modelRef = inject('modelRef');
        // const { validateInfos } = form;

        const onBlurName = e => {
            store.commit('promotion/setName', e.target.value.trim());
        };

        const onChangeDescription = e => {
            store.commit('promotion/setDescription', e.target.value);
        };

        return {
            // modelRef,
            // validateInfos,
            onBlurName,
            onChangeDescription,
        };
    },
};
</script>
