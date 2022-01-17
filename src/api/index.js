import Common from './common';
import Search from './search';
import ProductCategory from './product/category';
import AttributeSet from './attributeSet';
import Attribute from './attribute';
import Brand from './brand';

export default context => {
    const repositories = {
        common: Common(context.axios),
        search: Search(context.axios),
        productCategory: ProductCategory(context.axios),
        attributeSet: AttributeSet(context.axios),
        brand: Brand(context.axios),
        attribute: Attribute(context.axios),
    };

    context.provide('api', repositories);
};
