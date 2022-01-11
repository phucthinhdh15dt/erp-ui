import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getOr } from 'lodash/fp';

export const useCreateCategory = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const createCategory = async payload => {
        // store.commit('layout/setLoading', true);
        // const response = await api.order.getOrder(id);
        loading.value = true;
        const response = await api.productCategory.createCategory(payload);
        console.log(response);
        if (response.data) {
            result.value = 'Tạo ngành hàng mới thành công';
        }

        loading.value = false;
        // store.commit('layout/setLoading', false);
    };

    // onMounted(getWard);
    // watch(id, getPost);

    return {
        createCategory,
        loading,
        result,
        errorMessage,
    };
};

export const useUpdateCategory = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const updateCategory = async payload => {
        // store.commit('layout/setLoading', true);
        // const response = await api.order.getOrder(id);
        loading.value = true;
        const response = await api.productCategory.updateCategory(payload);
        console.log(response);
        if (response.data) {
            result.value = 'Chỉnh sửa ngành hàng thành công';
        }

        loading.value = false;
        // store.commit('layout/setLoading', false);
    };

    // onMounted(getWard);
    // watch(id, getPost);

    return {
        updateCategory,
        loading,
        result,
        errorMessage,
    };
};
