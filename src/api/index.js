import Common from './common';
import Search from './search';
import AttributeSet from './attributeSet';

export default context => {
    const repositories = {
        common: Common(context.axios),
        search: Search(context.axios),
        attributeSet: AttributeSet(context.axios),
    };

    context.provide('api', repositories);
};
