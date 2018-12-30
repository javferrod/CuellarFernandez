'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchByParameters = exports.searchByCodice = exports.searchByID = exports.saveClient = exports.saveUser = exports.saveParameters = exports.connectToDatabase = undefined;

var _init = require('./init');

var _insert = require('./insert');

var _search = require('./search');

exports.connectToDatabase = _init.connectToDatabase;
exports.saveParameters = _insert.saveParameters;
exports.saveUser = _insert.saveUser;
exports.saveClient = _insert.saveClient;
exports.searchByID = _search.searchByID;
exports.searchByCodice = _search.searchByCodice;
exports.searchByParameters = _search.searchByParameters;