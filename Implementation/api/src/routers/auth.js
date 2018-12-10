import Router from 'koa-router';


var authRouter = new Router();

authRouter.post('/login', async (ctx, next) => {
    ctx.body = {token: 'hola'}
});

authRouter.post('register', async (ctx, next) => {
    
});

export default authRouter;