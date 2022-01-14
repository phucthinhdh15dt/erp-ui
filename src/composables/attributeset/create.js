import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { AttributeItemPosition } from '@/constants/attributeItem';
import { cloneDeep } from 'lodash';

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
                layoutPosition: m.attributePosition ? m.attributePosition.value : null,
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
            let data = cloneDeep(response.data);
            if (data.attributes && data.attributes.length > 0) {
                data.attributes.forEach(element => {
                    if (element.layoutPosition) {
                        const position = AttributeItemPosition.find(m => m.value === element.layoutPosition);
                        if (position) {
                            element.position = position;
                        }
                    }
                });
            }
            store.dispatch('attributeSet/setAttributeSetDetail', data);
        }
        result.value = response.data;
        loading.value = false;
    };

    const getUpdateAttributeSet = async () => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const data = store.state.attributeSet.detail.data;
        debugger;
        let attributeItem = [];
        if (data.attributes && data.attributes.length > 0) {
            attributeItem = data.attributes.map(m => ({
                attrOrder: m.attrOrder,
                attributeCode: m.attribute.code,
                group: m.group,
                groupOrder: m.groupOrder,
                layoutPosition: m.position ? m.position.value : null,
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
    const loading = ref(false);
    const errorMessage = ref('');
    const result = ref({});

    const removeAttributeSetIds = async ids => {
        loading.value = true;
        errorMessage.value = '';
        result.value = '';
        const payload = ids;
        const response = await api.attributeSet.removeAttributeSetIds(payload);
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

export { useCreate, useProperties, useGetAttributeSet, useRemoveAttributeSet };
