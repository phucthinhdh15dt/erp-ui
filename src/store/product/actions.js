import { groupBy, pathOr, pick, flow, map, reduce, path } from 'lodash/fp';
import { removeAscent } from '@/utils/common';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash/fp';

const collectAttributes = (groupByAttributes, type) =>
    flow(
        pathOr([], type),
        map(pick(['group', 'groupOrder', 'attribute', 'attrOrder', 'attributeOrder', 'isVariant'])),
        groupBy('groupOrder'),
        groups => {
            return reduce((acc, cur) => {
                const _attributes = groups[cur];
                const existGroup = acc.find(_ => _.groupName === _attributes[0].group);
                const attributeData = map(
                    flow(
                        path('attribute'),
                        pick([
                            'id',
                            'defaultValue',
                            'description',
                            'label',
                            'type',
                            'uiComponentType',
                            'values',
                            'code',
                        ]),
                        attr => {
                            if (!attr.values) {
                                return attr;
                            }

                            const { values, ...rest } = attr;
                            const options = JSON.parse(values);

                            return {
                                ...rest,
                                options: options.map(_ => ({ value: _.code, label: _.value })),
                            };
                        }
                    )
                )(_attributes);

                if (!existGroup) {
                    const result = {
                        groupName: _attributes[0].group,
                        isVariant: _attributes[0].isVariant,
                        groupCode: removeAscent(_attributes[0].group).split(' ').join('_'),
                        attributes: attributeData,
                    };

                    acc.push(result);
                } else {
                    existGroup.attributes.push(...attributeData);
                }

                return acc;
            }, [])(Object.keys(groups));
        }
    )(groupByAttributes);

const setAttributes = (context, data) => {
    const attributes = data.attributes;
    const groupByAttributes = groupBy('layoutPosition', attributes);
    const leftAttributes = collectAttributes(groupByAttributes, 'LEFT');
    const rightAttributes = collectAttributes(groupByAttributes, 'RIGHT');

    console.log('attributes', attributes);
    console.log('leftAttributes', leftAttributes);
    console.log('rightAttributes', rightAttributes);
    const result = {
        left: leftAttributes,
        right: rightAttributes,
        all: attributes,
    };

    context.commit('setAttributes', result);
};

const setProductDetail = (context, data) => {
    context.commit('setProductDetail', data);
};

const setProductCertifications = (context, data) => {
    const results = data.map(_ => ({
        id: _.id,
        certificateId: _.numberDisclosure,
        publishDate: dayjs(_.disclosureDate),
        images: [_.imageUrl],
    }));

    context.commit('setProductCertifications', results);
};

//create
const addProductItem = (context, data) => {
    const { state } = context;
    const productItems = state.create.data.product.items;
    const newProductItems = cloneDeep(productItems);
    const foundProduct = newProductItems.find(_ => _.productCode === data.productCode);

    if (foundProduct) {
        foundProduct.quantity = foundProduct.quantity + data.quantity;
        context.commit('setProductItems', newProductItems);
    } else {
        newProductItems.push(data);
        context.commit('setProductItems', newProductItems);
    }
};

const updateProductItemQuantity = (context, { productCode, quantity }) => {
    const { state } = context;
    const productItems = state.create.data.product.items;
    const foundProduct = productItems.find(_ => _.productCode === productCode);

    if (foundProduct) {
        foundProduct.quantity = quantity;
        context.commit('setProductItems', productItems);
    }
};

const updateProductItemDiscount = (context, { productCode, discount }) => {
    const { state } = context;
    const productItems = state.create.data.product.items;
    const foundProduct = productItems.find(_ => _.productCode === productCode);

    if (foundProduct) {
        foundProduct.discount = discount;
        context.commit('setProductItems', productItems);
    }
};

const removeProductItem = (context, { productCode }) => {
    const { state } = context;
    const productItems = state.create.data.product.items;
    const foundProduct = productItems.findIndex(_ => _.productCode === productCode);

    if (foundProduct > -1) {
        productItems.splice(foundProduct, 1);
        context.commit('setProductItems', productItems);
    }
};

export default {
    setAttributes,
    setProductDetail,
    setProductCertifications,
    //create
    addProductItem,
    updateProductItemQuantity,
    updateProductItemDiscount,
    removeProductItem,
};
