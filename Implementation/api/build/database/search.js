"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchByID = searchByID;
exports.searchByCodice = searchByCodice;
exports.searchByParameters = searchByParameters;

var _init = require("./init");

var _names = require("./names");

var _ramda = _interopRequireDefault(require("ramda"));

async function searchByID(userID) {
  const filter = _ramda.default.pipe(leftJoin(_names.TEMPORAL_PARAMETERS), filterByID(userID));

  return filter((0, _init.knex)(_names.USERS));
}

async function searchByCodice(codice) {
  const filter = _ramda.default.pipe(leftJoin(_names.TEMPORAL_PARAMETERS), filterByCodice(codice));

  return filter((0, _init.knex)(_names.USERS));
}

async function searchByParameters(parameters) {
  const filter = _ramda.default.pipe(leftJoin(_names.TEMPORAL_PARAMETERS), filterRanges(parameters), filterFixed(parameters));

  return filter((0, _init.knex)(_names.USERS).select('users.id', 'latitude', 'longitude', 'weight', 'hearthrate', 'time'));
}

//HELPERS
const leftJoin = _ramda.default.curry((table, query) => {
  query.leftJoin(table, 'users.id', '=', `${table}.user`);
  return query;
});

const filterRanges = _ramda.default.curry((parameters, query) => {
  const {
    weight,
    hearthrate
  } = parameters;

  if (notNil(weight)) {
    let subquery = _init.knex.select("user").from(_names.TEMPORAL_PARAMETERS).whereBetween('weight', [weight.min, weight.max]);

    query.whereIn('users.id', subquery);
  }

  if (notNil(hearthrate)) {
    let subquery = _init.knex.select("user").from(_names.TEMPORAL_PARAMETERS).whereBetween('hearthrate', [hearthrate.min, hearthrate.max]);

    query.whereIn('users.id', subquery);
  }

  return query;
}); //TODO implement.


const filterFixed = _ramda.default.curry((parameters, query) => {
  const {
    gender
  } = parameters;
  if (notNil(gender)) query.where('gender', gender);
  return query;
});

const filterByID = _ramda.default.curry((userID, query) => {
  query.where('users.id', userID);
  return query;
});

const filterByCodice = _ramda.default.curry((codice, query) => {
  query.where('users.codice', codice);
  return query;
});

const notNil = _ramda.default.pipe(_ramda.default.isNil, _ramda.default.not);