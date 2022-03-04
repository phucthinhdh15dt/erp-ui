export const FORMAT_DATE_HAS_YEAR = 'DD/MM/YYYY HH:mm';
export const FORMAT_DATE_NO_YEAR = 'DD/MM HH:mm';
export const FORMAT_TIME = 'HH:mm';
export const STATUS_BRAND = {
    ACTIVE: {
        code: 'ACTIVE',
        label: 'Hoạt động',
        color: '#52c41a',
    },
    DEACTIVE: {
        code: 'DEACTIVE',
        label: 'Ngưng hoạt động',
        color: '#ff4d4f',
    },
};

export const STATUS_DISTRIBUTOR = {
    ACTIVE: {
        code: 'ACTIVE',
        label: 'Đang phân phối',
        color: '#52c41a',
    },
    DEACTIVE: {
        code: 'DEACTIVE',
        label: 'Ngưng phân phối',
        color: '#ff4d4f',
    },
};

export const ORDER_TYPE_TO_SALES_CHANNEL = {
    NORMAL: 'B2C',
    PRE_ORDER: '',
    B2B: 'B2B',
};

export const STATUS = {
    NEW: {
        code: 'NEW',
        label: 'Đã tiếp nhận',
        color: '#C4C4C4',
    },
    WAIT_PAY: {
        code: 'WAIT_PAY',
        label: 'Chờ thanh toán',
        color: '#C4C4C4',
    },
    PAID: {
        code: 'PAID',
        label: 'Đã thanh toán',
        color: '#53459B',
    },
    WAIT_CONFIRM: {
        code: 'WAIT_CONFIRM',
        label: 'Chờ xác nhận',
        color: '#C4C4C4',
    },
    CONFIRMED: {
        code: 'CONFIRMED',
        label: 'Đã xác nhận',
        color: 'blue',
    },
    PICKING: {
        code: 'PICKING',
        label: 'Đang lấy hàng',
        color: '#F7C544',
    },
    PACKING: {
        code: 'PACKING',
        label: 'Đang đóng gói',
        color: '#F7C544',
    },
    EXPORT_STOCK: {
        code: 'EXPORT_STOCK',
        label: 'Đã xuất kho',
        color: '#F7C544',
    },
    HANDOVER_DELIVERY: {
        code: 'HANDOVER_DELIVERY',
        label: 'Bàn giao vận chuyển',
        color: '#F29F45',
    },
    IN_LINEHAUL: {
        code: 'IN_LINEHAUL',
        label: 'Luân chuyển nội bộ',
        color: '#F29F45',
    },
    IN_LASTMILE: {
        code: 'IN_LASTMILE',
        label: 'Đang vận chuyển',
        color: '#F29F45',
    },
    RESCHEDULE_DELIVERY: {
        code: 'RESCHEDULE_DELIVERY',
        label: 'Hẹn giao lại',
        color: '#F29F45',
    },
    DELIVERY_DONE: {
        code: 'DELIVERY_DONE',
        label: 'Giao hàng thành công',
        color: 'green',
    },
    PENDING: {
        code: 'PENDING',
        label: 'Tạm giữ',
        color: 'blue',
    },
    COMPLETED: {
        code: 'COMPLETED',
        label: 'Hoàn thành',
        color: 'green',
    },
    RETURNED: {
        code: 'RETURNED',
        label: 'Hoàn hàng',
        color: 'purple',
    },
    CANCELED: {
        code: 'CANCELED',
        label: 'Đã hủy',
        color: 'red',
    },
};
