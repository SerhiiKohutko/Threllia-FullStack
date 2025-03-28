import {format, parse} from 'date-fns';
import {enUS} from 'date-fns/locale';

export function getFormattedDate(date){
    if (!date) return "Unknown Date";

    const parser = parse(date, 'yyyy-MM-dd', new Date());
    return format(parser, 'MMMM dd, yyyy', {locale: enUS});
}