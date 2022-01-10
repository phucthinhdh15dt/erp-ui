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

    const createAttribute = () => {
        debugger;
        loading.value = true;
        errorMessage.value = '';
        result.value = '';

        const data = store.state.attribute.create.data;

        const response = api.attribute.createAttributeGroup();

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

const useGetAttribute = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const errorMessage = ref('');
    const result = ref({});

    const getAttributeId = async id => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.attribute.getAttributeGroupId(id);
        store.dispatch('attribute/setAttributeDetail', response);
        result.value = response;
        loading.value = false;
    };

    const getUpdateAttribute = async () => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const data = store.state.attribute.detail.data;
        debugger;
        const response = await api.attribute.getUpdateAttribute(data);
        debugger;
        store.dispatch('attribute/setAttributeDetail', response);
        result.value = response;
        loading.value = false;
    };

    return {
        loading,
        result,
        errorMessage,
        getAttributeId,
        getUpdateAttribute,
    };
};

const useRemoveAttribute = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const errorMessage = ref('');
    const result = ref({});

    const removeAttributeId = async id => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.attribute.removeAttributeGroupId(id);

        result.value = response;

        loading.value = false;
    };

    return {
        loading,
        result,
        errorMessage,
        removeAttributeId,
    };
};

export { useCreate, useProperties, useGetAttribute, useRemoveAttribute };
