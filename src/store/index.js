import { createStore } from 'vuex';
import layout from './layout';
import list from './list';

export default createStore({
    modules: {
        layout,
        list,
    },
});
