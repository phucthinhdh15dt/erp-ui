import { createStore } from 'vuex';
import layout from './layout';
import list from './list';
import attribute from './attribute';

export default createStore({
    modules: {
        layout,
        list,
        attribute,
    },
});
