import Router from 'koa-router';
import { getParameters } from '../database/temporal';
import Query from '../database/query';

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


/*
* The fixed search have priority since is easier
* and narrows the search. The second search only
* filters the users selected by the first one.
*/

queryManager.post('/', async (ctx, next) => {
    var query = new Query(ctx.request.query);

    if(query.haveFixedParameters()){
        query = await fixedSearch(query);
        query = await temporalSearch(query);
    }
    else{
        query = await temporalSearch(query);
        query = await fixedSearch(query);
    }

    ctx.response.body = query.buildResults();

})


export default queryManager;