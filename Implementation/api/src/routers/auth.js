import Router from 'koa-router';
import { saveUser, saveClient } from '../database';
import R from 'ramda';


var authRouter = new Router({prefix: '/auth'});

authRouter.post('/login', async (ctx, next) => {
    ctx.response.body = {token: 'hola'}
});

authRouter.post('/register-user', async (ctx, next) => {
    const {username, password, name, residence, codice}= ctx.request.body;

    let id = await saveUser(username, password, name, residence, codice);

    if(R.isNil(id))
        ctx.responde.status = 500;
    else
        ctx.response.status = 200;
});

authRouter.post('/register-client', async (ctx, next) => {
    const {username, password, name }= ctx.request.body;

    let id = await saveClient(username, password, name);

    if(R.isNil(id))
        ctx.responde.status = 500;
    else
        ctx.response.status = 200;
});


export default authRouter;