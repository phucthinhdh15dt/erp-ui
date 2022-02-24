import store from '@/store';
import { ref, inject, onMounted } from 'vue';
import { isPlainObject } from 'lodash/fp';

export const useGetProductCertifications = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const getProductCertifications = async ids => {
        loading.value = true;
        const payload = {
            query: {
                bool: {
                    filter: {
                        terms: {
                            id: ids,
                        },
                    },
                },
            },
        };

        const response = await api.search.searchCertification(payload);
        if (response.data) {
            store.dispatch('product/setProductCertifications', response.data.hits);
        }

        loading.value = false;
    };

    return {
        getProductCertifications,
        loading,
        result,
        errorMessage,
    };
};

export const useUpdateProductCertification = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const normalize = value => {
        if (isPlainObject(value)) {
            return value.toISOString();
        }

        return value;
    };

    const updateProductCertification = async data => {
        loading.value = true;
        const payload = {
            numberDisclosure: data.certificateId,
            disclosureDate: normalize(data.publishDate),
            imageUrl: data.images[0],
        };

        const response = await api.certification.update(payload);
        if (response.success) {
            result.value = 'Cập nhật chứng chỉ thành công';
            // store.dispatch('product/setCertifications', response.data.hits);
        }

        loading.value = false;
    };

    return {
        updateProductCertification,
        loading,
        result,
        errorMessage,
    };
};
