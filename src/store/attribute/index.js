import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        create: {
            data: {
                category: undefined,
                brand: undefined,
                name: '',
                attributes: [],
            },
        },
    }),
    getters,
    actions,
    mutations,
};
