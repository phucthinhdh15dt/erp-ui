import { ref, onMounted, watch, inject } from 'vue';
import { useStore } from 'vuex';

const useCreate = () => {
    const api = inject('api');
    const store = useStore();
    const errorMessage = ref('');
    const loading = ref(false);
    const result = ref({});

    const createAttributeSet = async () => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        debugger;

        const data = store.state.attributeSet.create.data;
        let attributeItem = [];
        debugger;
        if (data.attributes && data.attributes.length > 0) {
            attributeItem = data.attributes.map(m => ({
                attrOrder: m.attributeOrder,
                attributeCode: m.code,
                group: m.groupName,
                groupOrder: m.groupOrder,
                layoutPosition: m.attributePosition.key,
            }));
        }
        const payload = {
            attributeItems: attributeItem,
            brandCode: data.brand.key,
            categoryCode: data.category.key,
            name: data.name,
        };

        const response = await api.attributeSet.createAttributeSet(payload);

        result.value = response.data;
        loading.value = false;
    };

    return {
        errorMessage,
        createAttributeSet,
        result,
        loading,
    };
};

const useProperties = () => {
    const api = inject('api');
    const store = useStore();
    const result = ref({});
    const errorMessage = ref('');
    const loading = ref(false);

    const getAttribute = async key => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';

        const payload = {
            query: {
                match_all: {},
            },
        };
        const response = await api.attributeSet.getAttribute(payload);
        if (response.data) {
            // hardcode
            if (key) {
                result.value = response.data.hits.filter(v => v.label.toLowerCase().indexOf(key.toLowerCase()) >= 0);
            } else {
                result.value = response.data.hits;
            }
            result.value = result.value.map(m => ({ id: m.id, code: m.code, label: m.label, type: m.uiComponentType }));
        }
        loading.value = false;
    };

    return {
        getAttribute,
        result,
        loading,
        errorMessage,
    };
};

const useGetAttribute = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const errorMessage = ref('');
    const result = ref({});

    const getAttributeSetId = async id => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.attribute.getAttributeSetId(id);

        store.dispatch('attribute/setAttributeDetail', response.data);
        result.value = response.data;
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
        getAttributeSetId,
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
        debugger;
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
