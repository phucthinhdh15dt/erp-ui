const removeAscent = str => {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
};

const isValidName = string => {
    var re = /^[a-zA-Z ]{2,}$/g; // regex here
    return re.test(removeAscent(string));
};

const validateEmail = value => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        value
    );
};
const charAndNumber = value => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,}/.test(value);
};
const charSpecial = value => {
    return /[$&+,:;=?@#|'<>.^*()%!-]/.test(value);
};
const validatePassword = value => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
};
const onlyNumber = evt => {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
    } else {
        return true;
    }
};
const formatPhoneNumber = value => {
    let number = value.replace(/[^0-9]/g, '');
    number = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    return number;
};
const validatePhoneNumber = value => {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value);
};

export {
    removeAscent,
    isValidName,
    validateEmail,
    charAndNumber,
    charSpecial,
    validatePassword,
    formatPhoneNumber,
    onlyNumber,
    validatePhoneNumber,
};
