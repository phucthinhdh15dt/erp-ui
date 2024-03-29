import { groupBy, pathOr, pick, flow, map, reduce, path } from 'lodash/fp';
import { removeAscent } from '@/utils/common';
import dayjs from 'dayjs';

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

export default {
    setAttributes,
    setProductDetail,
    setProductCertifications,
};
