import {format, parse} from 'date-fns';
import {enUS} from 'date-fns/locale';

export function getFormattedDate(date){
    if (!date) return "Unknown Date";

    const parser = getDateObject(date);
    return format(parser, 'MMMM dd, yyyy', {locale: enUS});
}


export function getDateObject(date){
    return parse(date, 'yyyy-MM-dd', new Date());
}