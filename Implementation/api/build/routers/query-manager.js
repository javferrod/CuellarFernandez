"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _database = require("../database");

var _ramda = _interopRequireDefault(require("ramda"));

const MIN_USERS = 2;
var queryManager = new _koaRouter.default({
  prefix: '/query'
});
queryManager.post('/codice', async (ctx, next) => {
  const {
    codice
  } = ctx.request.body;
  let individual = await (0, _database.searchByCodice)(codice);

  if (_ramda.default.isEmpty(individual)) {
    ctx.response.body = [];
  } else {
    ctx.response.body = {
      residence: get('name')(name),
      residence: get('residence')(individual),
      residence: get('genre')(individual),
      location: getLocations(individual),
      weight: getWeight(individual),
      hearthrate: getHearthRate(individual)
    };
  }
});
/*
query : {
    location: {lat, long},
    residence: {lat, long},
    age: {min, max},
    genre: {m/f},
    weight: {min, max}
    hearthrate: {min, max}
}
*/

queryManager.post('/', async (ctx, next) => {
  let resul = await (0, _database.searchByParameters)(ctx.request.body.parameters);
  let groupedResul = groupByUser(resul);
  if (countUsers(groupedResul) >= MIN_USERS) ctx.response.body = groupedResul; //remix(groupedResul);
  else ctx.response.status = 403;
});
var _default = queryManager;
exports.default = _default;

const groupByUser = _ramda.default.groupBy(_ramda.default.prop('id'));

const countUsers = _ramda.default.pipe(_ramda.default.keys, _ramda.default.length);

const getLocations = projectProps(['time', 'latitude', 'longitude']);
const getWeight = projectProps(['time', 'weight']);
const getHearthRate = projectProps(['time', 'weight']);

function projectProps(props) {
  return _ramda.default.pipe(_ramda.default.project(props), _ramda.default.filter(notNil(props)));
}

function notNil(props) {
  return _ramda.default.pipe(_ramda.default.pick(props), _ramda.default.keys, _ramda.default.length, _ramda.default.equals(_ramda.default.length(props)));
}

const get = prop => _ramda.default.pipe(_ramda.default.take(1), _ramda.default.pick(prop));
/*const remix = R.pipe(
    remixLatitude
)*/