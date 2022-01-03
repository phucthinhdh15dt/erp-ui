import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        menuCollapsed: false,
        loading: false,
    }),
    getters,
    actions,
    mutations,
};
