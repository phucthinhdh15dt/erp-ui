import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getOr } from 'lodash/fp';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const useGetProvince = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const getProvince = async (keyword, parentId = 0) => {
        // store.commit('layout/setLoading', true);
        loading.value = true;
        result.value = [];
        const query = { name: keyword.toLowerCase(), parentId: 0, type: 'PROVINCE' };
        const response = await api.common.getLocation(query);
        if (response.data) {
            result.value = response.data.map(_ => ({
                value: _.id,
                label: _.name,
            }));
        }

        loading.value = false;
        // store.commit('layout/setLoading', false);
    };

    onMounted(getProvince('', 0));
    // watch(id, getPost);

    return {
        getProvince,
        loading,
        result,
        errorMessage,
    };
};

const useGetDistrict = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const getDistrict = async (keyword, parentId = 0) => {
        // store.commit('layout/setLoading', true);
        // const response = await api.order.getOrder(id);
        loading.value = true;
        result.value = [];
        const query = { name: keyword.toLowerCase(), parentId, type: 'DISTRICT' };
        const response = await api.common.getLocation(query);
        if (response.data) {
            result.value = response.data.map(_ => ({
                value: _.id,
                label: _.name,
            }));
        }

        loading.value = false;
        // store.commit('layout/setLoading', false);
    };

    // onMounted(getDistrict);
    // watch(id, getPost);

    return {
        getDistrict,
        loading,
        result,
        errorMessage,
    };
};

const useGetWard = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const getWard = async (keyword, parentId = 0) => {
        // store.commit('layout/setLoading', true);
        // const response = await api.order.getOrder(id);
        loading.value = true;
        result.value = [];
        const query = { name: keyword.toLowerCase(), parentId, type: 'WARD' };
        const response = await api.common.getLocation(query);
        if (response.data) {
            result.value = response.data.map(_ => ({
                value: _.id,
                label: _.name,
            }));
        }

        loading.value = false;
        // store.commit('layout/setLoading', false);
    };

    // onMounted(getWard);
    // watch(id, getPost);

    return {
        getWard,
        loading,
        result,
        errorMessage,
    };
};

const getFullAddress = (address, label = 'name', street = 'noAndStreet') => {
    const addressList = [
        address[street],
        getOr('_', `ward.${label}`)(address),
        getOr('_', `district.${label}`)(address),
        getOr('_', `province.${label}`)(address),
    ];

    return addressList.join(', ');
};

export { useGetProvince, useGetDistrict, useGetWard, getFullAddress };
