import { ref, inject } from 'vue';

const useGetProduct = () => {
    const api = inject('api');
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

    return {
        getProduct,
        result,
        resetter,
        errorMessage,
        loading,
    };
};

export { useGetProduct };
