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

const setAttributeDetail = (context, data) => {
    context.commit('setAttributeDetail', data);
};

const removeDetailAttribute = (context, data) => {
    const { state } = context;
    const attributes = state.detail.data.attributes;

    const index = attributes.findIndex(_ => _.id === data.id);
    if (index >= 0) {
        attributes.splice(index, 1);
        context.commit('setDetailAttributeProperties', cloneDeep(attributes));
    }
};

const addDetailAttribute = (context, data) => {
    const { state } = context;
    const attributes = state.detail.data.attributes;
    const foundAttribute = attributes.findIndex(_ => _.id === data.id);
    if (foundAttribute < 0) {
        context.commit('setDetailAttributeProperties', [...attributes, data]);
    } else {
        attributes.splice(foundAttribute, 1);
        context.commit('setDetailAttributeProperties', cloneDeep(attributes));
    }
};

export default {
    addAttribute,
    removeAttribute,
    setAttributeDetail,
    removeDetailAttribute,
    addDetailAttribute,
};
