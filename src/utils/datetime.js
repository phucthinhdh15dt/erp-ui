import moment from 'moment';
import { FORMAT_DATE_HAS_YEAR, FORMAT_DATE_NO_YEAR, FORMAT_TIME } from '@/constants';

export const getFormatDate = (date, noYear = true, noTime = false) => {
    const currentYear = moment().year();
    const year = moment(date).year();
    let result = FORMAT_DATE_HAS_YEAR;

    if (noYear && year === currentYear) {
        result = FORMAT_DATE_NO_YEAR;
    }

    return noTime ? result.replace(FORMAT_TIME, '').trim() : result;
};
