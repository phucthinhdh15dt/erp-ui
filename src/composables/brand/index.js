import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { cloneDeep } from 'lodash';
import { STATUS_BRAND } from '@/constants';

export const useBrand = () => {
    const api = inject('api');
    const store = useStore();
    const errorMessage = ref('');
    const loading = ref(false);
    const result = ref({});

    const getBrandId = async id => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';

        const response = await api.brand.getBrandId(id);
        if (response && response.data) {
            let data = cloneDeep(response.data);

            const lst = Object.values(STATUS_BRAND).map(_ => ({ value: _.code, label: _.label }));
            data.status = lst[1];

            if (response.data) {
                const index = lst.find(f => f.value === response.data.status);
                if (index >= 0) {
                    data.status = lst[index];
                }
            }

            store.commit('brand/setBrandData', data);
            result.value = data;
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

export const useCreateBrand = () => {
    const api = inject('api');
    const store = useStore();
    const errorMessage = ref('');
    const loading = ref(false);
    const result = ref({});

    const createBrand = async data => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';

        const response = await api.brand.createBrand(data);
        if (response && response.data) {
            result.value = 'tạo mới thương hiệu thành công';
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

export const useUpdateBrand = () => {
    const api = inject('api');
    const store = useStore();
    const errorMessage = ref('');
    const loading = ref(false);
    const result = ref({});

    const updateBrand = async data => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.brand.updateBrand(data);
        if (response && response.success) {
            result.value = 'Cập nhật thông tin thương hiệu thành công';
        }
        loading.value = false;
    };
    return {
        errorMessage,
        result,
        loading,
        updateBrand,
    };
};

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
