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

        const data = store.state.attributeSet.create.data;
        let attributeItem = [];
        if (data.attributes && data.attributes.length > 0) {
            debugger;
            attributeItem = data.attributes.map(m => ({
                attrOrder: m.attributeOrder,
                attributeCode: m.code,
                group: m.groupName,
                groupOrder: m.groupOrder,
                layoutPosition: m.attributePosition.value,
                isVariant: m.isVariant,
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

const useGetAttributeSet = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const errorMessage = ref('');
    const result = ref({});

    const getAttributeSetId = async id => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.attributeSet.getAttributeSetId(id);

        if (response.data) {
            store.dispatch('attributeSet/setAttributeSetDetail', response.data);
        }
        result.value = response.data;
        loading.value = false;
    };

    const getUpdateAttributeSet = async () => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const data = store.state.attributeSet.detail.data;

        let attributeItem = [];
        if (data.attributes && data.attributes.length > 0) {
            debugger;
            attributeItem = data.attributes.map(m => ({
                attrOrder: m.attrOrder,
                attributeCode: m.attribute.code,
                group: m.group,
                groupOrder: m.groupOrder,
                layoutPosition: m.layoutPosition.key,
                isVariant: m.isVariant,
            }));
        }
        const payload = {
            attributeItems: attributeItem,
            brandCode: data.brand.code,
            categoryCode: data.category.code,
            name: data.name,
            id: data.id,
        };
        debugger;
        const response = await api.attributeSet.getUpdateAttributeSet(payload);
        if (response.data) {
            const detailResponse = await api.attributeSet.getAttributeSetId(response.data);
            if (detailResponse.data) {
                store.dispatch('attributeSet/setAttributeSetDetail', detailResponse.data);
            }
        }
        result.value = response;
        loading.value = false;
    };

    return {
        loading,
        result,
        errorMessage,
        getAttributeSetId,
        getUpdateAttributeSet,
    };
};

const useRemoveAttributeSet = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const errorMessage = ref('');
    const result = ref({});

    const removeAttributeSetId = async id => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.attributeSet.removeAttributeSetId(id);
        result.value = response;
        loading.value = false;
    };

    return {
        loading,
        result,
        errorMessage,
        removeAttributeSetId,
    };
};

const useRemoveAttributeSetList = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const errorMessage = ref('');
    const result = ref({});

    const removeAttributeSetIds = async ids => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const response = await api.attributeSet.removeAttributeSetIds(ids);
        result.value = response;
        loading.value = false;
    };

    return {
        loading,
        result,
        errorMessage,
        removeAttributeSetIds,
    };
};

export { useCreate, useProperties, useGetAttributeSet, useRemoveAttributeSet, useRemoveAttributeSetList };
