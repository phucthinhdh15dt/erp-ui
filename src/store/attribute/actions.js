import { cloneDeep } from 'lodash';

const addAttribute = (context, data) => {
    const { state } = context;
    const attributes = state.create.data.attributes;
    const foundAttribute = attributes.findIndex(_ => _.id === data.id);
    if (foundAttribute < 0) {
        context.commit('setAttributeCreateListAttribute', [...attributes, data]);
    } else {
        attributes.splice(foundAttribute, 1);
        context.commit('setAttributeCreateListAttribute', cloneDeep(attributes));
    }
};

const removeAttribute = (context, data) => {
    const { state } = context;
    const attributes = state.create.data.attributes;

    const index = attributes.findIndex(_ => _.id === data.id);
    if (index >= 0) {
        attributes.splice(index, 1);
        context.commit('setAttributeCreateListAttribute', cloneDeep(attributes));
    }
};

export default {
    addAttribute,
    removeAttribute,
};
