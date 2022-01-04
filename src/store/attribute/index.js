import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        create: {
            data: {
                category: {},
                brand: {},
                name: '',
                attributes: [],
            },
        },
    }),
    getters,
    actions,
    mutations,
};
