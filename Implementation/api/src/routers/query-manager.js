import Router from 'koa-router';
import R from 'ramda';

var queryManager = new Router({ prefix: '/query' });

import { getParameters } from '../database/temporal';

queryManager.get('/', async (ctx, next) => {
    let user = ctx.request.body.auth;

    return ctx.response.body = await getParameters(user);
});


/*
query : {
    location: {lat, long},
    residence: {lat, long},
    age: {min, max},
    genre: {m/f},
    weight: {min, max}
    hearthrate: {min, max}
}


*/

queryManager.post('/', async (ctx, next) => {
    let query = ctx.request.query;
    
    var fixedResults, temporalResults;

    if(isFixedQuery(query))
        fixedResults = await fixedSearch(query);
    
    if(isNotEmpty(fixedResults) && isTemporalQuery(query))
        temporalResults = await temporalSearch(query);

    ctx.response.body = union(fixedResults, temporalResults);

})

const isNotEmpty = R.compose(R.not, R.isEmpty);
const isFixedQuery = R.compose(isNotEmpty, R.props('residence', 'age', 'genre'));
const isTemporalQuery = R.compose(isNotEmpty, R.props('location', 'weight', 'hearthrate'));
const union = R.compose()


export default queryManager;