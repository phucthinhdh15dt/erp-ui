import { ref, inject, onMounted } from 'vue';

export const useCreateAttribute = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const createAttribute = async payload => {
        loading.value = true;

        const response = await api.attribute.createAttribute(payload);
        if (response.data) {
            result.value = 'Tạo thuộc tính mới thành công';
        }

        loading.value = false;
    };

    return {
        createAttribute,
        loading,
        result,
        errorMessage,
    };
};

export const useUpdateAttribute = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref('');
    const errorMessage = ref('');

    const updateAttribute = async payload => {
        loading.value = true;

        const response = await api.attribute.updateAttribute(payload);
        if (response.success) {
            result.value = 'Chỉnh sửa thuộc tính thành công';
        }

        loading.value = false;
    };

    return {
        updateAttribute,
        loading,
        result,
        errorMessage,
    };
};
