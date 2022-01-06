// import { apiGenerator } from '@/helpers/api';
// import { API_NAME } from '@/configs/api';

export default axios => ({
    getCategory() {
        // const api = apiGenerator(axios, API_NAME.SEARCH_ORDER_ES, { payload });
        // return api.call();
        return [
            {
                id: 1,
                name: 'Trang chủ',
            },
            {
                id: 2,
                name: 'Dưỡng da',
            },
        ];
    },
    getBrand() {
        // const api = apiGenerator(axios, API_NAME.SEARCH_ORDER_ES, { payload });
        // return api.call();
        return [
            {
                id: 1,
                name: 'Blissbery',
            },
            {
                id: 2,
                name: 'Bach hóa xanh',
            },
        ];
    },
    getProperties() {
        // const api = apiGenerator(axios, API_NAME.SEARCH_ORDER_ES, { payload });
        // return api.call();
        return [
            {
                id: 1,
                attributeName: 'Chiều dài sản phẩm',
                nature: null,
            },
            {
                id: 2,
                attributeName: 'Chiều rộng sản phẩm',
                nature: null,
            },
            {
                id: 3,
                attributeName: 'Chiều cao sản phẩm',
                nature: null,
            },
            {
                id: 4,
                attributeName: 'Khối lượng sản phẩm',
                nature: null,
            },
            {
                id: 5,
                attributeName: 'Đặc tính sản phẩm',
                nature: null,
            },
        ];
    },
    getNature() {
        // const api = apiGenerator(axios, API_NAME.SEARCH_ORDER_ES, { payload });
        // return api.call();
        return [
            {
                id: 1,
                natureName: 'Mô tả',
            },
            {
                id: 2,
                natureName: 'Thời gian',
            },
            {
                id: 3,
                natureName: 'Yes/No',
            },
        ];
    },
    createAttribute(data) {
        return 1;
    },

    getAttributeId(id) {
        return {
            id: id,
            category: {
                id: 2,
                name: 'Dưỡng da',
            },
            brand: {
                id: 2,
                name: 'Bách hóa xanh',
            },
            name: 'Test nè',
            attributes: [
                {
                    id: 2,
                    attributeName: 'Thuộc tính test 1',
                    nature: {
                        id: 2,
                        natureName: 'Thời gian',
                    },
                },
                {
                    id: 5,
                    attributeName: 'Thuộc tính test 5',
                    nature: {
                        id: 3,
                        natureName: 'Yes/No',
                    },
                },
            ],
        };
    },
    removeAttributeId(id) {
        return 'OK';
    },
});
