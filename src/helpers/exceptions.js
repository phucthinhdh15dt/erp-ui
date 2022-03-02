import { getOr } from 'lodash/fp';

const exceptionHandler = (errorCode, errorInfo) => {
    console.log(errorCode, errorInfo);
    let message = 'Có lỗi xảy ra';
    switch (errorCode) {
        case 400:
            message = getOr(errorInfo, 'message')(errorInfo);
            break;

        case 404:
            message = 'Không tìm thấy endpoint';
            break;

        case 500:
            message = getOr(message, 'message')(errorInfo);
            break;
        case 406:
            message = getOr(message, 'message')(errorInfo);
            switch (message) {
                case 'attribute.code.exist':
                    message = 'Mã thuộc tính đã tồn tại';
                    break;
                case 'brand.add.exist':
                    message = 'Thương hiệu đã tồn tại';
                    break;
                case 'product_category.add.exist':
                    message = 'Ngành hàng đã tồn tại';
                    break;
            }

            break;
    }

    return {
        code: errorCode,
        message,
    };
};

export default exceptionHandler;
