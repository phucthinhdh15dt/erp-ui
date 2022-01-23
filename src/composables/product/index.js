import { reactive, inject, ref } from 'vue';
import { useLayoutLoading } from '@/composables/common/layout';
import { useStore } from 'vuex';
import { isPlainObject, groupBy, pathOr, pick, flow, map, reduce, path } from 'lodash/fp';

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
        if (isPlainObject(value)) {
            return value.toISOString();
        }

        return value;
    };

    const collectCertifications = map(_ => ({
        certificateId: _.certificateId,
        publishDate: normalize(_.publishDate),
        images: ['https://some.images'],
    }));

    const collectAttributes = attributes =>
        Object.keys(attributes).reduce((acc, cur) => {
            let attr = {};
            if (cur === 'certifications') {
                attr = {
                    attrCode: 'giay_chung_nhan',
                    value: JSON.stringify(collectCertifications(attributes[cur])),
                };
            } else if (cur === 'distributors') {
                attr = {
                    attrCode: 'nha_phan_phoi',
                    value: JSON.stringify(attributes[cur]),
                };
            } else {
                attr = {
                    attrCode: cur,
                    value: normalize(attributes[cur]),
                };
            }

            acc.push(attr);

            return acc;
        }, []);

    const collectVariant = variants => {
        return variants;
    };

    const collectPayload = data => {
        console.log('data', data);
        const { general, variants = [], ...attributes } = data;
        const payload = {
            attributes: collectAttributes(attributes),
            brandCode: general.brand,
            categoryCode: general.category,
            code: 'string',
            englishName: general.englishName,
            manufacturerCodes: [],
            name: general.productName,
            originalPrice: 0,
            registedName: general.registerName,
            status: 'IN_PRODUCTION',
            url: general.url,
            variantCodes: collectVariant(variants),
        };

        return null;

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

export const useGetProductDetail = () => {
    const { layoutLoading, layoutDone } = useLayoutLoading();
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref(null);
    const errorMessage = ref('');

    const prepareVariants = data => {
        const variants = JSON.parse(data);

        return variants.map(variant => {
            const { productCode, status, attributes } = variant;
            const _attributes = JSON.parse(attributes);

            return {
                productCode,
                status,
                attributes: _attributes.map(_ => _.value),
            };
        });
    };

    const collectPayload = data => {
        const result = {
            general: {
                brand: pathOr('', 'brand.code')(data),
                category: pathOr('', 'categories[0].code')(data),
                productName: data.name,
                englishName: data.englishName,
                registerName: data.registedName,
                url: data.url,
            },
            variants: prepareVariants(data.variants),
        };

        return result;
    };

    const getProductDetail = async id => {
        layoutLoading();
        const response = await api.product.get(id);
        console.log('response', response);
        if (response.data) {
            result.value = collectPayload(response.data[0]);
            // store.dispatch('product/setProductDetail', response.data[0]);
        }
        layoutDone();
    };

    return {
        getProductDetail,
        loading,
        result,
        errorMessage,
    };
};
