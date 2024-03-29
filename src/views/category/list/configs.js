export const columns = [
    {
        title: 'Mã ngành hàng',
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
        title: 'Ngành hàng cha',
        dataIndex: 'parentCategory',
        key: 'parentCategory',
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
    fields: ['code', 'name'],
    placeholder: 'Nhập mã hoặc tên ngành hàng',
    rowKey: 'code',
    urlParam: 'category',
};

export const sortConfigs = [
    {
        idNum: 'desc',
    },
];
