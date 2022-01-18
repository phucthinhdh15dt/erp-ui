import { createStore } from 'vuex';
import layout from './layout';
import list from './list';
import product from './product';

export default createStore({
    modules: {
        layout,
        list,
        product,
    },
});
