import { groupBy, pathOr, pick, flow, map, reduce, path } from 'lodash/fp';
import { removeAscent } from '@/utils/common';

const collectAttributes = (groupByAttributes, type) =>
    flow(
        pathOr([], type),
        map(pick(['group', 'groupOrder', 'attribute', 'attrOrder', 'attributeOrder'])),
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

export default {
    setAttributes,
};
