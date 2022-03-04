export const columnsCreate = [
    // {
    //     title: 'STT',
    //     dataIndex: 'id',
    //     key: 'id',
    //     width: 60,
    //     align: 'center',
    // },
    {
        title: 'Sản phẩm',
        dataIndex: 'productName',
        key: 'productName',
        slots: { customRender: 'product' },
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'right',
        slots: { customRender: 'quantity' },
        width: 200,
    },
    {
        title: 'Thành tiền',
        dataIndex: 'total',
        key: 'total',
        align: 'right',
        slots: { customRender: 'total' },
        width: 150,
    },
    {
        title: '',
        slots: { customRender: 'action' },
        width: 150,
    },
];
