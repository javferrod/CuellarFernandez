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

var _queryManager = require('./routers/query-manager');

var _queryManager2 = _interopRequireDefault(_queryManager);

var _database = require('./database/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cors = require('@koa/cors');

var app = new _koa2.default();
var router = new _koaRouter2.default();

(0, _database2.default)();

app.use(cors()).use((0, _koaBodyparser2.default)()).use(router.routes()).use(_dataRecollector2.default.routes()).use(_queryManager2.default.routes()).listen(8080);