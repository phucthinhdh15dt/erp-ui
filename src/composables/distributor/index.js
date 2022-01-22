import store from '@/store';
import { ref, inject, onMounted } from 'vue';

export const useGetAllDistributor = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const getAllDistributor = async payload => {
        loading.value = true;
        payload = {
            size: 10000,
        };

        const response = await api.search.searchDistributor(payload);
        console.log('response', response);
        if (response.data) {
            store.dispatch('distributor/setList', response.data.hits);
        }

        loading.value = false;
    };

    onMounted(getAllDistributor);

    return {
        getAllDistributor,
        loading,
        result,
        errorMessage,
    };
};
