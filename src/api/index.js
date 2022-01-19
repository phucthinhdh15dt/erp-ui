import Common from './common';
import Search from './search';
import Category from './category';
import AttributeSet from './attributeSet';
import Attribute from './attribute';
import Brand from './brand';
import Product from './product';

export default context => {
    const repositories = {
        common: Common(context.axios),
        search: Search(context.axios),
        category: Category(context.axios),
        attributeSet: AttributeSet(context.axios),
        brand: Brand(context.axios),
        attribute: Attribute(context.axios),
        product: Product(context.axios),
    };

    context.provide('api', repositories);
};
