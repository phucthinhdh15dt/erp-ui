import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        attributes: {
            left: [],
            right: [],
            all: [],
        },
        detail: {
            general: {
                brand: null,
                category: null,
                name: '',
                englishName: '',
                registedName: '',
                url: '',
            },
        },
    }),
    getters,
    actions,
    mutations,
};
