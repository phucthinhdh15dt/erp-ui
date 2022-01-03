import Common from './common';
import Search from './search';

export default context => {
    const repositories = {
        common: Common(context.axios),
        search: Search(context.axios),
    };

    context.provide('api', repositories);
};
