import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { cloneDeep } from 'lodash/fp';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { formatToCurrency } from '@/utils/number';
import { caculatorPrice } from '@/utils/index';
import { STATUS } from '@/constants/index';
// import { useSearch } from '@/composables/list/index';

const useGetOperationStatus = () => {
    const api = inject('api');
    const store = useStore();
    const result = ref({});
    const errorMessage = ref('');

    const getOperationStatus = async id => {
        // store.commit('layout/setLoading', true);
        const response = await api.product.getOperationStatus(id);

        if (response.data) {
            store.dispatch('product/setOperationStatus', cloneDeep(response.data));
        }
        // store.commit('layout/setLoading', false);
    };

    onMounted(getOperationStatus);
    // watch(id, getPost);

    return {
        getOperationStatus,
        result,
        errorMessage,
    };
};

const useGetCancelReason = () => {
    const api = inject('api');
    const store = useStore();
    const result = ref({});
    const errorMessage = ref('');

    const getCancelReason = async id => {
        // store.commit('layout/setLoading', true);
        const response = await api.product.getCancelReason(id);

        if (response.data) {
            store.dispatch('product/setCancelReason', cloneDeep(response.data));
        }
        // store.commit('layout/setLoading', false);
    };

    onMounted(getCancelReason);
    // watch(id, getPost);

    return {
        getCancelReason,
        result,
        errorMessage,
    };
};

const useGetProduct = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const getProduct = async ({ key, saleChannel }) => {
        loading.value = true;
        const response = await api.product.getProduct({ key, saleChannel });

        result.value = response.data.map(_ => ({
            value: _.code,
            label: _.name,
            extra: {
                id: _.id,
                productName: _.name,
                productCode: _.code,
                availableQuantity: 14,
                quantity: 1,
                price: _.price,
                currentPrice: _.price,
                discount: 0,
                totalPrice: _.price,
                originalPrice: _.originalPrice,
            },
        }));

        loading.value = false;
    };

    const resetter = () => {
        result.value = [];
    };

    // onMounted(getCancelReason);
    // watch(id, getPost);

    return {
        getProduct,
        result,
        resetter,
        errorMessage,
        loading,
    };
};

export { useGetOperationStatus, useGetCancelReason, useGetProduct };
