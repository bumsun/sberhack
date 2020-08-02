import moment from 'moment'
import 'moment/min/locales'
export const getReviewDate = (timestamp) => {
    moment.locale('ru');
    return moment(timestamp).format('DD MMMM YYYY')
}