import Router from 'koa-router';
import R from 'ramda';
import { isFixedQuery, isTemporalQuery, isNotEmpty } from '../common/query-helpers';
import { getParameters } from '../database/temporal';

var queryManager = new Router({ prefix: '/query' });

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

const union = R.compose()


export default queryManager;