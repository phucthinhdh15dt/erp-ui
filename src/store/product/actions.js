import { groupBy, pathOr, pick, flow, map, reduce, path } from 'lodash/fp';
import { removeAscent } from '@/utils/common';

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
    };

    context.commit('setAttributes', result);
};

const prepareVariants = data => {
    console.log('🚀 ~ file: actions.js ~ line 78 ~ data', data);
    const variants = JSON.parse(data);
    return variants;
    // return variants.map(variant => {
    //     const { productCode, status, attributes } = variant;
    //     // const _attributes = JSON.parse(attributes);

    //     return {
    //         productCode,
    //         status,
    //         attributes: attributes.map(_ => _.value),
    //     };
    // });
};

const prepareAttributes = reduce((acc, cur) => {
    acc[cur.attribute.code] = cur.value;

    return acc;
}, {});

const setProductDetail = (context, data) => {
    // a = {
    //     attributes: collectAttributes(attributes),
    //     avatar: 'string',
    //     brandCode: general.brand,
    //     categoryCode: general.category,
    //     code: 'string',
    //     description: 'string',
    //     englishName: general.englishName,
    //     gallery: ['string'],
    //     id: 0,
    //     listedPrice: 0,
    //     name: general.productName,
    //     originalPrice: 0,
    //     registedName: general.registerName,
    //     salesChannel: ['string'],
    //     seoDescription: 'string',
    //     seoTitle: 'string',
    //     status: 'IN_PRODUCTION',
    //     url: general.url,
    //     userManual: 'string',
    //     uses: 'string',
    //     variantCodes: variants,
    // };

    const result = {
        general: {
            brand: pathOr('', 'brand.code')(data),
            category: pathOr('', 'categories[0].code')(data),
            name: data.name,
            englishName: data.englishName,
            registedName: data.registedName,
            url: data.url,
        },
        variants: prepareVariants(data.variantJson),
        ...prepareAttributes(data.attributes),
    };

    context.commit('setProductDetail', result);
};

export default {
    setAttributes,
    setProductDetail,
};
