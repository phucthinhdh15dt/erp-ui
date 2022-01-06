import { ref, onMounted, watch, inject } from 'vue';
import { useStore } from 'vuex';

const useCreate = () => {
    const api = inject('api');
    const store = useStore();
    const resultCate = ref({});
    const resultBrand = ref({});
    const errorMessage = ref('');
    const loadingCate = ref(false);
    const loadingBrand = ref(false);
    const loading = ref(false);
    const result = ref({});

    const getCategory = async () => {
        loadingCate.value = true;
        errorMessage.value = '';
        resultCate.value = '';
        const response = await api.attribute.getCategory();

        resultCate.value = response;
        loadingCate.value = false;
    };
    const getBrand = async () => {
        loadingBrand.value = true;
        errorMessage.value = '';
        resultBrand.value = '';
        const response = await api.attribute.getBrand();

        resultBrand.value = response;
        loadingBrand.value = false;
    };

    const createAttribute = async data => {
        debugger;
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.attribute.createAttribute();

        result.value = response;
        loading.value = false;
    };

    return {
        getCategory,
        getBrand,
        resultCate,
        resultBrand,
        errorMessage,
        loadingCate,
        loadingBrand,
        createAttribute,
        result,
        loading,
    };
};

const useProperties = () => {
    const api = inject('api');
    const store = useStore();
    const result = ref({});
    const resultNature = ref({});
    const errorMessage = ref('');
    const loading = ref(false);

    const getProperties = async key => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.attribute.getProperties();

        // hardcode
        if (key) {
            result.value = response.filter(v => v.attributeName.toLowerCase().indexOf(key.toLowerCase()) >= 0);
        } else {
            result.value = response;
        }
        loading.value = false;
    };

    const getNature = async () => {
        loading.value = true;
        errorMessage.value = '';
        resultNature.value = '';
        const response = await api.attribute.getNature();

        resultNature.value = response;
        loading.value = false;
    };

    return {
        getProperties,
        result,
        loading,
        errorMessage,
        getNature,
        resultNature,
    };
};

export { useCreate, useProperties };
