import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { cloneDeep } from 'lodash';

const useBrand = () => {
    const api = inject('api');
    const store = useStore();
    const errorMessage = ref('');
    const loading = ref(false);
    const result = ref({});

    const getBrandId = async id => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';

        const response = await api.brand.createAttributeSet(payload);
        if (response && response.data) {
            store.commit('brand/setBrandCreate', response.data);
            result.value = response.data;
        }
        loading.value = false;
    };

    return {
        errorMessage,
        getBrandId,
        result,
        loading,
    };
};

const useCreateBrand = () => {
    const api = inject('api');
    const store = useStore();
    const errorMessage = ref('');
    const loading = ref(false);
    const result = ref({});

    const createBrand = async data => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';

        const payload = {
            code: data.code,
            name: data.name,
            // description: data.description,
        };

        const response = await api.brand.createBrand(payload);
        if (response && response.data) {
            result.value = response.data;
        }
        loading.value = false;
    };

    return {
        errorMessage,
        createBrand,
        result,
        loading,
    };
};

export { useBrand, useCreateBrand };
