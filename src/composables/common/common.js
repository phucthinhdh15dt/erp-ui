import { ref, inject } from 'vue';
import { useStore } from 'vuex';

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
            size: 1000,
        };
        const response = await api.common.getCategory(query);
        if (response.data) {
            const data = response.data.hits.filter(f => f.code && f.name);
            if (data) {
                result.value = data.map(m => ({ id: m.id, code: m.code, label: m.name, type: m.categoryType }));
                store.commit('attributeSet/setCommonCategory', result.value);
                await getBrand();
            }
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
            size: 1000,
        };
        const response = await api.common.getBrand(query);
        if (response.data) {
            const data = response.data.hits.filter(f => f.code && f.name);
            if (data) {
                resultBrand.value = data.map(m => ({ id: m.id, code: m.code, label: m.name }));
                store.commit('attributeSet/setCommonBrand', resultBrand.value);
            }
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
