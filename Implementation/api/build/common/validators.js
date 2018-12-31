"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidLocation = exports.isValidType = exports.isValidParameter = exports.LOCATION = exports.WEIGHT = exports.HEARTHRATE = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

const HEARTHRATE = 'hearthrate';
exports.HEARTHRATE = HEARTHRATE;
const WEIGHT = 'weight';
exports.WEIGHT = WEIGHT;
const LOCATION = 'location';
exports.LOCATION = LOCATION;

const isValidType = _ramda.default.contains(_ramda.default.__, [HEARTHRATE, WEIGHT, LOCATION]); //TODO change this


exports.isValidType = isValidType;

const isValidParameter = parameter => {
  return true;
  if (!isValidType(parameter.type)) return false;
  if (parameter.type === LOCATION && !isValidLocation(parameter.fields)) return false;
  return true;
};

exports.isValidParameter = isValidParameter;

const isValidLocation = location => _ramda.default.both(_ramda.default.has(location, 'latitude'), _ramda.default.has(location, 'longitude'));

exports.isValidLocation = isValidLocation;