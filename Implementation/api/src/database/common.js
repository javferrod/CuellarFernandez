import R from 'ramda';
import { PERMISSIONS, USERS } from './names';

const filterByUser = R.curry((userID, query) => {
        query.where(`${PERMISSIONS}.user`, userID);
        return query;
});

const leftJoin = R.curry((table, on, query) => {
    query.leftJoin(table, `${USERS}.id`, '=', `${table}.${on}`);
    return query;
});

export { filterByUser, leftJoin }