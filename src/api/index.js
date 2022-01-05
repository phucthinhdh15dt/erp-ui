import Common from './common';
import Search from './search';
import Attribute from './attribute';

export default context => {
    const repositories = {
        common: Common(context.axios),
        search: Search(context.axios),
        attribute: Attribute(context.axios),
    };

    context.provide('api', repositories);
};
