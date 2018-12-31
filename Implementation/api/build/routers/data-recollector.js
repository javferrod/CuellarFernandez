"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _database = require("../database");

var dataRecollector = new _koaRouter.default({
  prefix: '/data'
});
dataRecollector.post('/', async (ctx, next) => {
  let user = ctx.request.body.auth;
  let parameters = ctx.request.body.parameters;

  if (!user || !parameters) {
    ctx.response.status = 400;
    return;
  }

  await (0, _database.saveParameters)(parameters, user);
  ctx.response.status = 200;
});
var _default = dataRecollector;
exports.default = _default;