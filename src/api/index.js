import Common from './common';
import Search from './search';
import ProductCategory from './product/category';
import ProductAttribute from './product/attribute';
import Product from './product';

export default context => {
    const repositories = {
        common: Common(context.axios),
        search: Search(context.axios),
        productCategory: ProductCategory(context.axios),
        productAttribute: ProductAttribute(context.axios),
        product: Product(context.axios),
    };

    context.provide('api', repositories);
};
