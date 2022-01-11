import Common from './common';
import Search from './search';
import ProductCategory from './product/category';

export default context => {
    const repositories = {
        common: Common(context.axios),
        search: Search(context.axios),
        productCategory: ProductCategory(context.axios),
    };

    context.provide('api', repositories);
};
