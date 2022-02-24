import { ref, inject, onMounted } from 'vue';
import { useLayoutLoading } from '@/composables/common/layout';

export const useCreateCategory = () => {
    const { layoutLoading, layoutDone } = useLayoutLoading();
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const createCategory = async payload => {
        result.value = '';

        layoutLoading();
        const response = await api.category.createCategory(payload);
        if (response.data) {
            result.value = 'Tạo ngành hàng mới thành công';
        }
        loading.value = false;
        layoutDone();
    };

    return {
        createCategory,
        loading,
        result,
        errorMessage,
    };
};

export const useUpdateCategory = () => {
    const { layoutLoading, layoutDone } = useLayoutLoading();

    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const updateCategory = async payload => {
        result.value = '';
        loading.value = true;
        layoutLoading();
        const response = await api.category.updateCategory(payload);
        if (response.success) {
            result.value = 'Chỉnh sửa ngành hàng thành công';
        }
        loading.value = false;
        layoutDone();
    };

    return {
        updateCategory,
        loading,
        result,
        errorMessage,
    };
};

export const useGetAllCategory = () => {
    const { layoutLoading, layoutDone } = useLayoutLoading();

    const api = inject('api');
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const getAllCategory = async () => {
        layoutLoading();

        const response = await api.search.searchProductCategory({ from: 0, size: 10000 });
        if (response.data) {
            result.value = response.data.hits.map(_ => ({ id: _.id, value: _.code, label: _.name }));
        }

        layoutDone();
    };

    onMounted(getAllCategory);

    return {
        getAllCategory,
        loading,
        result,
        errorMessage,
    };
};
