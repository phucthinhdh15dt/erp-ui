import { reactive, inject, ref } from 'vue';
import { useLayoutLoading } from '@/composables/common/layout';
import { useStore } from 'vuex';
import { isPlainObject, pathOr, map, reduce } from 'lodash/fp';

export const rulesRef = reactive({
    'general.category': [
        {
            required: true,
            message: 'Chọn ngành hàng',
        },
    ],
    // 'general.brand': [
    //     {
    //         required: true,
    //         message: 'Chọn thương hiệu',
    //     },
    // ],
    'general.name': [
        {
            required: true,
            message: 'Nhập tên sản phẩm',
        },
    ],
});

export const useUpsertProduct = () => {
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

    const createCertificationPromise = data =>
        new Promise(resolve => {
            api.certification
                .create(data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(() => {
                    resolve(null);
                });
        });

    const collectCertificationPromises = map(_ => {
        if (_.id) {
            return _.id;
        }

        const payload = {
            numberDisclosure: _.certificateId,
            disclosureDate: normalize(_.publishDate),
            imageUrl:
                'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544808?k=20&m=1147544808&s=612x612&w=0&h=8CUTlOdLd2d5HqO7p6kREJHyxDyAH0VeFA6u7mOQXbo=',
        };

        return createCertificationPromise(payload);
    });

    const collectCertifications = async data => {
        if (!data) {
            return null;
        }

        const certificationsPromise = collectCertificationPromises(data);
        const listCertification = await Promise.all(certificationsPromise);

        return {
            attrCode: '12',
            value: JSON.stringify(listCertification.filter(_ => _)),
        };
    };

    const collectVariant = items => {
        const groupVariants = store.state.product.attributes.right;
        return items.reduce((acc, cur) => {
            let attrVariant = {};

            const groupIndex = groupVariants.findIndex(
                v => v.isVariant && v.attributes && v.attributes.map(m => m.code).includes(cur)
            );
            if (groupIndex >= 0) {
                const groupVariant = groupVariants[groupIndex];
                const attribute = groupVariant.attributes.find(f => f.code === cur);
                if (attribute) {
                    attrVariant = {
                        attributes: [
                            {
                                code: cur,
                                value: attribute.label,
                            },
                        ],
                        productCode: '',
                        status: 'IN_PRODUCTION',
                    };

                    acc.push(attrVariant);
                }
            }

            return acc;
        }, []);
    };

    const collectAttributes = attributes =>
        Object.keys(attributes).reduce((acc, cur) => {
            let attr = {};
            if (cur === 'distributors') {
                attr = {
                    attrCode: '13',
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

    const collectPayload = async (mode, data) => {
        console.log('data', data);
        const { general, variants = [], certifications = [], ...attributes } = data;

        const attributesCollected = collectAttributes(attributes);

        const certificationsCollected = await collectCertifications(certifications.filter(_ => _.certificateId));
        if (certificationsCollected) {
            attributesCollected.push(certificationsCollected);
        }
        const payload = {
            attributes: attributesCollected,
            categoryCode: general.category,
            code: 'string',
            englishName: general.englishName,
            manufacturerCodes: [],
            name: general.name,
            originalPrice: 0,
            registedName: general.registedName,
            status: 'IN_PRODUCTION',
            url: general.url,
            // variants
        };
        if (general.brand) {
            payload.brandCode = general.brand;
        }

        if (mode === 'update') {
            payload.code = general.code;
            payload.status = general.status;
        }

        return payload;
    };

    const createProduct = async data => {
        layoutLoading();
        const payload = await collectPayload('create', data);

        // variant create
        const { variants = [] } = data;
        payload.variants = collectVariant(variants);

        console.log('payload', payload);
        const response = await api.product.create(payload);
        if (response.data) {
            result.value = response.data;
        }
        layoutDone();
    };

    const updateProduct = async data => {
        layoutLoading();
        console.log('data', data);
        const payload = await collectPayload('update', data);

        // variant update
        payload.variants = data.variants;

        console.log('payload', payload);
        const response = await api.product.update(payload);
        if (response.success) {
            result.value = 'Cập nhật sản phẩm thành công';
        }
        layoutDone();
    };

    return {
        createProduct,
        updateProduct,
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
        const variants = data ? JSON.parse(data) : [];
        return variants;
        // return variants.map(variant => {
        //     const { productCode, status, attributes } = variant;
        //     // const _attributes = JSON.parse(attributes);

        //     return {
        //         productCode,
        //         status,
        //         attributes: attributes.map(_ => _.value),
        //     };
        // });
    };

    const prepareAttributes = reduce((acc, cur) => {
        if (cur.attribute.label === 'Giấy chứng nhận') {
            const parseValue = JSON.parse(cur.value);

            acc.certifications = parseValue;
        } else if (cur.attribute.label === 'Nhà phân phối') {
            const parseValue = JSON.parse(cur.value);

            acc.distributors = parseValue;
        } else {
            acc[cur.attribute.code] = cur.value;
        }

        return acc;
    }, {});

    const getProductDetail = async id => {
        layoutLoading();
        const response = await api.product.get(id);

        if (response.data) {
            const data = response.data[0];
            const result = {
                general: {
                    status: data.status,
                    brand: pathOr('', 'brand.code')(data),
                    category: pathOr('', 'categories[0].code')(data),
                    name: data.name,
                    englishName: data.englishName,
                    registedName: data.registedName,
                    url: data.url,
                    code: data.code,
                },
                variants: prepareVariants(data.variantJson),
                ...prepareAttributes(data.attributes),
            };

            store.dispatch('product/setProductDetail', result);
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
