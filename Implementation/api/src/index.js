import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import authRouter from './auth';

const cors = require('@koa/cors');



var app = new Koa();
var router = new Router();

router.use('/auth', authRouter.routes());

router.post('/', async (ctx, next) => {
});

router.get('/', async (ctx, next) => {
    ctx.body = {hola: 'hola'}
});


app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080); 