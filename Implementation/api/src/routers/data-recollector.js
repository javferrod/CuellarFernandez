import Router from 'koa-router';
import { saveParameters, populateUsers, populateParameters } from '../database';

var dataRecollector = new Router({ prefix: '/data' });

dataRecollector.post('/', async (ctx, next) => {
    const { auth, parameters } = ctx.request.body; 

    if(!auth || !parameters){
        ctx.response.status = 400;
        return;
    }
    
    await saveParameters(parameters, auth);
    
    ctx.response.status = 200;
});

/*
* Only for testing, generates 20 users and 100 parameters more.
*/
dataRecollector.post('/fake', async (ctx, next) => {
    await populateUsers(20);
    await populateParameters(100, 20);
})


export default dataRecollector;