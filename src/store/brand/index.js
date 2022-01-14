import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        create: {
            data: {
                name: '',
                code: '',
                description: '',
            },
        },
        detail: {
            data: {
                id: undefined,
                name: '',
                code: '',
                description: '',
                status,
            },
        },
        isOpen: false,
        isEdit: false,
    }),
    getters,
    actions,
    mutations,
};
