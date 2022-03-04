import { reactive, inject, ref } from 'vue';
import { useLayoutLoading } from '@/composables/common/layout';
import { useStore } from 'vuex';
import { isPlainObject, pathOr, map, reduce, isEmpty, isArray } from 'lodash/fp';

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
    'general.name': [
        {
            required: true,
            message: 'Nhập tên sản phẩm',
        },
    ],
    'general.status': [
        {
            required: true,
            message: 'Chọn trạng thái',
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
        } else if (isArray(value)) {
            return JSON.stringify(value);
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
            imageUrl: _.images,
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

    const collectVariantsUpdate = (variants, general) => {
        let isStatusChange = general.status !== general.initalStatus;

        return reduce((acc, cur) => {
            const status = isStatusChange ? general.status : cur.status;

            acc.push({
                attributes: reduce((_acc, _cur) => {
                    if (!['productCode', 'status'].includes(_cur)) {
                        _acc.push({
                            code: _cur,
                            value: cur[_cur],
                        });
                    }

                    return _acc;
                }, [])(Object.keys(cur)),
                productCode: cur.productCode,
                status: status,
            });

            return acc;
        }, [])(variants);
    };

    const collectVariantsCreate = variants => {
        if (isEmpty(variants)) return [];

        const variantKeys = Object.keys(variants);
        const result = [];

        const key1 = variantKeys[0];
        const key2 = variantKeys[1];

        if (key2) {
            for (const value1 of variants[key1]) {
                for (const value2 of variants[key2]) {
                    result.push({
                        attributes: [
                            {
                                code: key1,
                                value: value1,
                            },
                            {
                                code: key2,
                                value: value2,
                            },
                        ],
                        productCode: '',
                        status: 'IN_PRODUCTION',
                    });
                }
            }
        } else {
            for (const value1 of variants[key1]) {
                result.push({
                    attributes: [
                        {
                            code: key1,
                            value: value1,
                        },
                    ],
                    productCode: '',
                    status: 'IN_PRODUCTION',
                });
            }
        }

        return result;
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
        const listCombo = store.state.product.create.data.product.items.map(item => ({
            code: item.productCode,
            quantity: item.quantity,
        }));
        console.log('data', data);
        const { general, variants = [], certifications = [], ...attributes } = data;

        const attributesCollected = collectAttributes(attributes);
        const variantsCollected =
            mode === 'update' ? collectVariantsUpdate(variants, general) : collectVariantsCreate(variants);

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
            variants: variantsCollected,
            items: listCombo,
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
        console.log('variants', variants);

        return variants.map(variant => {
            const { productCode, status, attributes } = variant;

            return {
                productCode,
                ...attributes.reduce((acc, cur) => {
                    acc[cur.code] = cur.value;

                    return acc;
                }, {}),
                status,
            };
        });
    };

    const getJSONValueMaybe = value => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };

    const prepareAttributes = reduce((acc, cur) => {
        if (cur.attribute.label === 'Giấy chứng nhận') {
            const parseValue = JSON.parse(cur.value);

            acc.certifications = parseValue;
        } else if (cur.attribute.label === 'Nhà phân phối') {
            const parseValue = JSON.parse(cur.value);

            acc.distributors = parseValue;
        } else {
            acc[cur.attribute.code] = getJSONValueMaybe(cur.value);
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
                    initalStatus: data.status,
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
