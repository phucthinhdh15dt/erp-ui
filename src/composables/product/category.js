import { ref, inject, onMounted } from 'vue';

export const useCreateCategory = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const createCategory = async payload => {
        loading.value = true;

        const response = await api.productCategory.createCategory(payload);
        if (response.data) {
            result.value = 'Tạo ngành hàng mới thành công';
        }

        loading.value = false;
    };

    return {
        createCategory,
        loading,
        result,
        errorMessage,
    };
};

export const useUpdateCategory = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const updateCategory = async payload => {
        loading.value = true;

        const response = await api.productCategory.updateCategory(payload);
        if (response.success) {
            result.value = 'Chỉnh sửa ngành hàng thành công';
        }

        loading.value = false;
    };

    return {
        updateCategory,
        loading,
        result,
        errorMessage,
    };
};

export const useGetAllCategory = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const getAllCategory = async () => {
        loading.value = true;

        const response = await api.search.searchProductCategory({ from: 0, size: 10000 });
        if (response.data) {
            result.value = response.data.hits.map(_ => ({ value: _.id, label: _.name }));
        }

        loading.value = false;
    };

    onMounted(getAllCategory);

    return {
        getAllCategory,
        loading,
        result,
        errorMessage,
    };
};
