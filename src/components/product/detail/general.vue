<template>
    <div>
        <div class="card-head-title">Thông tin chung</div>
        <Card body-style="padding: 0">
            <Descriptions :column="1">
                <DescriptionsItem label="Trạng thái sản phẩm" class="label-width-18 border-bottom">
                    <StatusTag :value="general.status" />
                </DescriptionsItem>
                <DescriptionsItem label="Ngành hàng" class="label-width-18 border-bottom">
                    <CategoryLabel :value="general.category" />
                </DescriptionsItem>
                <DescriptionsItem label="Thương hiệu" class="label-width-18 border-bottom">
                    <BrandLabel :value="general.brand" />
                </DescriptionsItem>
                <DescriptionsItem label="Tên sản phẩm" class="label-width-18 border-bottom">
                    {{ general.name }}
                </DescriptionsItem>
                <DescriptionsItem label="Tên sản phẩm đăng ký" class="label-width-18 border-bottom">
                    {{ general.registedName }}
                </DescriptionsItem>
                <DescriptionsItem label="Tên tiếng anh" class="label-width-18 border-bottom">
                    {{ general.englishName }}
                </DescriptionsItem>
                <DescriptionsItem label="Url" class="label-width-18">
                    {{ general.url }}
                </DescriptionsItem></Descriptions
            >
        </Card>
    </div>
</template>

<script setup>
import { watch, computed } from 'vue';
import { useStore } from 'vuex';
import { Card, Descriptions } from 'ant-design-vue';
import CategoryLabel from '@/components/product/materials/categoryLabel.vue';
import BrandLabel from '@/components/product/materials/brandLabel.vue';
import StatusTag from '@/components/product/materials/statusTags.vue';
import { useSearchAttributeSet } from '@/composables/product/attribute';

const { Item: DescriptionsItem } = Descriptions;

const store = useStore();

const general = computed(() => store.state.product.detail.general);

const { searchAttributeSet } = useSearchAttributeSet();

watch(
    () => [general.value.category, general.value.brand],
    () => {
        if (general.value.category && general.value.brand) {
            searchAttributeSet(general.value.category, general.value.brand);
        }
    }
);
</script>
