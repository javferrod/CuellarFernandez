'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _validators = require('../common/validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataRecollector = new _koaRouter2.default({ prefix: '/data' });

dataRecollector.post('/', function (ctx, next) {
    var user = ctx.request.body.auth;
    var parameters = ctx.request.body.parameters;

    if (!user || !parameters) {
        ctx.response.status = 400;
        return;
    }

    ctx.response.status = 200;
});

function processParameters(parameters, user) {
    console.log(parameters);
    console.log(parameters.filter(_validators.isValidParameter));
}

exports.default = dataRecollector;