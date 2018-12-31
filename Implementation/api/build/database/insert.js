"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUser = saveUser;
exports.saveClient = saveClient;
exports.saveParameters = saveParameters;

var _init = require("./init");

var _names = require("./names");

var _ramda = _interopRequireDefault(require("ramda"));

async function saveUser(username, password, name, residence, codice) {
  let data = {
    username,
    password,
    name,
    residence,
    codice,
    client: false
  };
  return (0, _init.knex)(_names.USERS).returning('id').insert(data);
}

async function saveClient(username, password, name) {
  let data = {
    username,
    password,
    name,
    client: true
  };
  return (0, _init.knex)(_names.USERS).returning('id').insert(data);
}
/*
* parameter is a json with the correct keys 
* (hearthrate, weight, latitude or longitude)
* and insert them into the database. 
*/


async function saveParameters(parameters, userID) {
  let get = getParameters(userID);
  return (0, _init.knex)(_names.TEMPORAL_PARAMETERS).returning('id').insert(get(parameters));
}

_ramda.default.assoc();

// HELPERS
const getParameters = userID => _ramda.default.pipe(_ramda.default.pick(['weight', 'hearthrate', 'latitude', 'longitude']), _ramda.default.assoc('user', userID));