import { reactive, inject, ref } from 'vue';
import { useLayoutLoading } from '@/composables/common/layout';
import { useStore } from 'vuex';

export const modelRef = reactive({
    general: { category: '', brand: '', productName: '', registerName: '', englishName: '', url: '' },
});

export const rulesRef = reactive({
    'general.category': [
        {
            required: true,
            message: 'Chọn ngành hàng',
        },
    ],
    'general.brand': [
        {
            required: true,
            message: 'Chọn thương hiệu',
        },
    ],
    'general.productName': [
        {
            required: true,
            message: 'Nhập tên sản phẩm',
        },
    ],
    'general.registerName': [
        // {
        //     required: true,
        //     message: 'Please input product registerName',
        // },
    ],
    'general.englishName': [
        // {
        //     required: true,
        //     message: 'Please input english englishName',
        // },
    ],
    'general.url': [
        // {
        //     required: true,
        //     message: 'Please input url',
        // },
    ],
});

export const useCreateProduct = () => {
    const { layoutLoading, layoutDone } = useLayoutLoading();
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const normalize = value => {
        if (value instanceof Object) {
            return value.toISOString();
        }

        return value;
    };

    const collectAttributes = attributes =>
        Object.keys(attributes).reduce((acc, cur) => {
            acc.push({
                attrCode: cur,
                value: normalize(attributes[cur]),
            });

            return acc;
        }, []);

    const collectPayload = data => {
        console.log('data', data);
        const { general, ...attributes } = data;
        const payload = {
            attributes: collectAttributes(attributes),
            avatar: 'string',
            brandCode: general.brand,
            categoryCode: general.category,
            code: 'string',
            description: 'string',
            englishName: general.englishName,
            gallery: ['string'],
            id: 0,
            listedPrice: 0,
            name: general.productName,
            originalPrice: 0,
            registedName: general.registerName,
            salesChannel: ['string'],
            seoDescription: 'string',
            seoTitle: 'string',
            status: 'IN_PRODUCTION',
            url: general.url,
            userManual: 'string',
            uses: 'string',
        };

        return payload;
    };

    const createProduct = async data => {
        layoutLoading();
        const payload = collectPayload(data);
        console.log('payload', payload);
        const response = await api.product.create(payload);
        console.log('response', response);
        if (response.data) {
            result.value = response.data;
        }
        layoutDone();
    };

    return {
        createProduct,
        loading,
        result,
        errorMessage,
    };
};
