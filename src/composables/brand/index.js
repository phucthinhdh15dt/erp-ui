import { ref, inject, onMounted } from 'vue';

export const useGetAllBrand = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const getAllBrand = async () => {
        loading.value = true;

        const response = await api.search.searchBrand({ from: 0, size: 10000 });
        if (response.data) {
            result.value = response.data.hits.map(_ => ({ value: _.code, label: _.name }));
        }

        loading.value = false;
    };

    onMounted(getAllBrand);

    return {
        getAllBrand,
        loading,
        result,
        errorMessage,
    };
};
