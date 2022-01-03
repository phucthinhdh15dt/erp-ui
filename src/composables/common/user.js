import { ref, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import { cloneDeep, getOr } from 'lodash/fp';
import { getFullAddress } from '@/composables/common/location';

const useSearchCustomer = () => {
    const api = inject('api');
    const store = useStore();
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const searchCustomer = async phone => {
        loading.value = true;
        const response = await api.common.getUser(phone);
        let data = [
            {
                label: phone,
                value: phone,
                extra: {
                    fullName: '',
                    address: '',
                    email: '',
                },
            },
        ];
        if (response.data) {
            data = response.data.map(_ => ({
                label: _.phoneNumber,
                value: _.phoneNumber,
                extra: {
                    fullName: _.name,
                    address: getFullAddress(_.contacts[0].address),
                    email: _.email,
                    username: _.uid.username,
                    phone: _.phoneNumber,
                },
                contacts: _.contacts,
            }));
        }
        result.value = data;
        loading.value = false;
    };

    return {
        searchCustomer,
        result,
        errorMessage,
        loading,
    };
};

export { useSearchCustomer };
