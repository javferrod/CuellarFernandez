import Router from 'koa-router';
import { saveParameters } from '../database';

var dataRecollector = new Router({ prefix: '/data' });

dataRecollector.post('/', async (ctx, next) => {
    let user = ctx.request.body.auth;
    let parameters = ctx.request.body.parameters;

    if(!user || !parameters){
        ctx.response.status = 400;
        return;
    }
    
    await saveParameters(parameters, user);
    
    ctx.response.status = 200;
});


export default dataRecollector;