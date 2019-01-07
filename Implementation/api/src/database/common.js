import R from 'ramda';

const filterByUser = R.curry((userID, query) => {
        query.where(`${PERMISSIONS}.user`, userID);
        return query;
});

export { filterByUser }