import store from '@/store';
import { ref, inject, onMounted } from 'vue';

export const useGetAllManufacturer = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const getAllManufacturer = async payload => {
        loading.value = true;
        payload = {
            size: 10000,
        };

        const response = await api.search.searchManufacturer(payload);
        if (response.data) {
            store.dispatch('manufacturer/setList', response.data.hits);
        }

        loading.value = false;
    };

    onMounted(getAllManufacturer);

    return {
        getAllManufacturer,
        loading,
        result,
        errorMessage,
    };
};
