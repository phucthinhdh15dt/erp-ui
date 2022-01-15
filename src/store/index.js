import { createStore } from 'vuex';
import layout from './layout';
import list from './list';
import attributeSet from './attributeSet';
import brand from './brand';

export default createStore({
    modules: {
        layout,
        list,
        attributeSet,
        brand
    },
});
