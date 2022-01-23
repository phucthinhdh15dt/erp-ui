import store from '@/store';
import { ref, inject, onMounted } from 'vue';

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
        console.log('response', response);
        if (response.data) {
            store.dispatch('product/setCertifications', response.data.hits);
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

    const updateProductCertification = async payload => {
        loading.value = true;
        // const payload = {
        //     query: {
        //         bool: {
        //             filter: {
        //                 terms: {
        //                     id: ids,
        //                 },
        //             },
        //         },
        //     },
        // };

        const response = await api.certification.update(payload);
        console.log('response', response);
        if (response.data) {
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
