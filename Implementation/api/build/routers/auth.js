"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _database = require("../database");

var _ramda = _interopRequireDefault(require("ramda"));

var authRouter = new _koaRouter.default({
  prefix: '/auth'
});
authRouter.post('/login', async (ctx, next) => {
  ctx.response.body = {
    token: 'hola'
  };
});
authRouter.post('/register', async (ctx, next) => {
  const {
    username,
    password,
    name,
    residence,
    codice
  } = ctx.request.body;
  var id; //If is user

  id = await (0, _database.saveUser)(username, password, name, residence, codice); //Else client
  //id = saveClient(..);

  if (_ramda.default.isNil(id)) ctx.responde.status = 500;else ctx.response.status = 200;
});
var _default = authRouter;
exports.default = _default;