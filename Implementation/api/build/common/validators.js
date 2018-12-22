'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isValidLocation = exports.isValidType = exports.isValidParameter = exports.LOCATION = exports.WEIGHT = exports.HEARTHRATE = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEARTHRATE = 'hearthrate';
var WEIGHT = 'weight';
var LOCATION = 'location';

var isValidType = _ramda2.default.contains(_ramda2.default.__, [HEARTHRATE, WEIGHT, LOCATION]);

//TODO change this
var isValidParameter = function isValidParameter(parameter) {

    return true;
    if (!isValidType(parameter.type)) return false;
    if (parameter.type === LOCATION && !isValidLocation(parameter.fields)) return false;

    return true;
};

var isValidLocation = function isValidLocation(location) {
    return _ramda2.default.both(_ramda2.default.has(location, 'latitude'), _ramda2.default.has(location, 'longitude'));
};

exports.HEARTHRATE = HEARTHRATE;
exports.WEIGHT = WEIGHT;
exports.LOCATION = LOCATION;
exports.isValidParameter = isValidParameter;
exports.isValidType = isValidType;
exports.isValidLocation = isValidLocation;