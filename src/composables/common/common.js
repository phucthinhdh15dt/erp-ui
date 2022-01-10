import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getOr } from 'lodash/fp';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const useCommon = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref([]);
    const resultBrand = ref([]);
    const errorMessage = ref('');

    const getCategory = async () => {
        loading.value = true;
        result.value = [];
        const query = {
            query: {
                match_all: {},
            },
        };
        const response = await api.common.getCategory(query);
        if (response.data) {
            result.value = response.data.hits;
        }

        loading.value = false;
    };

    const getBrand = async () => {
        loading.value = true;
        resultBrand.value = [];
        const query = {
            query: {
                match_all: {},
            },
        };
        const response = await api.common.getBrand(query);
        if (response.data) {
            resultBrand.value = response.data.hits;
        }

        loading.value = false;
    };

    return {
        getCategory,
        loading,
        result,
        errorMessage,
        getBrand,
        resultBrand,
    };
};

export { useCommon };
