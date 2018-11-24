import Koa from 'koa';
import Router from 'koa-router';
import Mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';

const cors = require('@koa/cors');

Mongoose.connect('mongodb://mongo/prueba');


var app = new Koa();
var router = new Router();

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