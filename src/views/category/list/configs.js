export const columns = [
    {
        title: 'Mã thương hiệu',
        dataIndex: 'code',
        key: 'code',
        width: 200,
        align: 'center',
    },
    {
        title: 'Tên ngành hàng',
        dataIndex: 'name',
        key: 'name',
        width: 300,
        align: 'center',
    },
    {
        title: 'Ngành hàng con',
        dataIndex: 'subCategory',
        key: 'subCategory',
        width: 300,
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
];

export const filters = [
    // {
    //     type: 'DateRange',
    //     label: 'Thời gian',
    //     name: 'createdAt',
    // },
];

export const searchConfigs = {
    fields: ['id', 'name'],
    placeholder: 'Nhập mã hoặc tên ngành hàng',
    rowKey: 'categoryId',
    urlParam: 'category',
};

export const sortConfigs = [
    // {
    //     createdAt: { order: 'desc', format: 'strict_date_optional_time_nanos' },
    // },
];
