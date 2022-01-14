import Common from './common';
import Search from './search';
import AttributeSet from './attributeSet';
import Brand from './brand';

export default context => {
    const repositories = {
        common: Common(context.axios),
        search: Search(context.axios),
        attributeSet: AttributeSet(context.axios),
        brand: Brand(context.axios),
    };

    context.provide('api', repositories);
};
