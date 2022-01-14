import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { cloneDeep } from 'lodash/fp';
import { STATUS_BRAND } from '@/constants';

export const defaultState = {
    data: {
        id: undefined,
        name: '',
        code: '',
        description: '',
        status: Object.values(STATUS_BRAND).map(_ => ({ value: _.code, label: _.label }))[0],
    },

    isOpen: false,
    isEdit: false,
};

export default {
    namespaced: true,
    state: () => cloneDeep(defaultState),
    getters,
    actions,
    mutations,
};
