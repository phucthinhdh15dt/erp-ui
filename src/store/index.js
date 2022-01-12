import { createStore } from 'vuex';
import layout from './layout';
import list from './list';
import attributeSet from './attributeSet';

export default createStore({
    modules: {
        layout,
        list,
        attributeSet,
    },
});
