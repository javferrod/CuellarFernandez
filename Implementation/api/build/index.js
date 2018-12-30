'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _routers = require('./routers');

var _database = require('./database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cors = require('@koa/cors');

var app = new _koa2.default();
var router = new _koaRouter2.default();

(0, _database.connectToDatabase)();

app.use(cors()).use((0, _koaBodyparser2.default)()).use(router.routes()).use(_routers.authRouter.routes()).use(_routers.dataRecollector.routes()).use(_routers.queryManager.routes()).listen(8080);