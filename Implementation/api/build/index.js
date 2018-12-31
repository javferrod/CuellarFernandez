"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _routers = require("./routers");

var _database = require("./database");

const cors = require('@koa/cors');

var app = new _koa.default();
var router = new _koaRouter.default();
(0, _database.connectToDatabase)();
app.use(cors()).use((0, _koaBodyparser.default)()).use(router.routes()).use(_routers.authRouter.routes()).use(_routers.dataRecollector.routes()).use(_routers.queryManager.routes()).listen(8080);