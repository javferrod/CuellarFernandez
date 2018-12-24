import Router from 'koa-router';
import { saveUser } from '../database';
import R from 'ramda';


var authRouter = new Router({prefix: '/auth'});

authRouter.post('/login', async (ctx, next) => {
    ctx.response.body = {token: 'hola'}
});

authRouter.post('/register', async (ctx, next) => {
    const {username, password, name, residence, codice}= ctx.request.body;
    var id;

    //If is user
    id = await saveUser(username, password, name, residence, codice);
    //Else client
    //id = saveClient(..);

    if(R.isNil(id))
        ctx.responde.status = 500;
    else
        ctx.response.status = 200;
});

export default authRouter;