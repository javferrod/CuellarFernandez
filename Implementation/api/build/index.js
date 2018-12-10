'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _dataRecollector = require('./routers/data-recollector');

var _dataRecollector2 = _interopRequireDefault(_dataRecollector);

var _auth = require('./routers/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cors = require('@koa/cors');

var app = new _koa2.default();
var router = new _koaRouter2.default();

//router.use('/auth', authRouter.routes());


app.use(cors()).use((0, _koaBodyparser2.default)()).use(router.routes()).use(_dataRecollector2.default.routes()).use(router.allowedMethods()).listen(8080);