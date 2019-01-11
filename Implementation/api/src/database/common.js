import R from 'ramda';
import { PERMISSIONS } from './names';

const filterByUser = R.curry((userID, query) => {
        query.where(`${PERMISSIONS}.user`, userID);
        return query;
});

export { filterByUser }