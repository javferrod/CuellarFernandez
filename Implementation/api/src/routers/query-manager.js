import Router from 'koa-router';
import { searchByCodice, searchByParameters } from '../database';
import R from 'ramda';

const MIN_USERS = 2;

var queryManager = new Router({ prefix: '/query' });

queryManager.post('/codice', async (ctx, next) => {
    const { codice } = ctx.request.body;
    ctx.response.body = await searchByCodice(codice);
})

queryManager.get('/', async (ctx, next) => {
    let user = ctx.request.body.auth;

    //return ctx.response.body = await getParameters(user);
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
    let resul = await searchByParameters(ctx.request.body.parameters);
    let groupedResul = groupByUser(resul);
    
    if(countUsers(groupedResul) >= MIN_USERS)
        ctx.response.body = remix(groupedResul);
    else
        ctx.response.status = 403;
})

export default queryManager;

const groupByUser = R.groupBy(R.prop('id'));
const countUsers = R.pipe(
    R.keys,
    R.length
)

const getLocations = R.project(['time', 'latitude', 'longitude']);
const getWeight = R.project(['time', 'weight']);
const getHearthRate = R.project(['time', 'hearthrate']);

const remix = R.pipe(
    remixLatitude
)