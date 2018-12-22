import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import dataRecollector from './routers/data-recollector';
import authRouter from './routers/auth';
import queryManager from './routers/query-manager';

import { connectToDatabase, saveParameter } from './database';

const cors = require('@koa/cors');


var app = new Koa();
var router = new Router();

connectToDatabase();

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(authRouter.routes())
  .use(dataRecollector.routes())
  .use(queryManager.routes())
  .listen(8080); 