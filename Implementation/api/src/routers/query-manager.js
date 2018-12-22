import Router from 'koa-router';
import { searchByCodice, searchByParameters } from '../database';

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
    ctx.response.body = await searchByParameters(ctx.request.body.parameters)
})

export default queryManager;