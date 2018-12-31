"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "connectToDatabase", {
  enumerable: true,
  get: function () {
    return _init.connectToDatabase;
  }
});
Object.defineProperty(exports, "saveParameters", {
  enumerable: true,
  get: function () {
    return _insert.saveParameters;
  }
});
Object.defineProperty(exports, "saveUser", {
  enumerable: true,
  get: function () {
    return _insert.saveUser;
  }
});
Object.defineProperty(exports, "saveClient", {
  enumerable: true,
  get: function () {
    return _insert.saveClient;
  }
});
Object.defineProperty(exports, "searchByID", {
  enumerable: true,
  get: function () {
    return _search.searchByID;
  }
});
Object.defineProperty(exports, "searchByCodice", {
  enumerable: true,
  get: function () {
    return _search.searchByCodice;
  }
});
Object.defineProperty(exports, "searchByParameters", {
  enumerable: true,
  get: function () {
    return _search.searchByParameters;
  }
});

var _init = require("./init");

var _insert = require("./insert");

var _search = require("./search");