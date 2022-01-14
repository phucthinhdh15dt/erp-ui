import { cloneDeep } from 'lodash/fp';
import { defaultState } from './index';

const resetBrandData = context => {
    context.commit('setBrandData', cloneDeep(defaultState.dataCreate));
    context.commit('setIsEdit', false);
};

export default {
    resetBrandData,
};
