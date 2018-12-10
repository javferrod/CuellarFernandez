'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PULSE = 'pulse';
var WEIGHT = 'weight';
var LOCATION = 'location';

var isValidType = _ramda2.default.contains(_ramda2.default.__, [PULSE, WEIGHT, LOCATION]);

var isValidParameter = function isValidParameter(parameter) {
    if (!isValidType(parameter.type)) return false;
    if (parameter.type === LOCATION && !isValidLocation(parameter.fields)) return false;
    if (!_ramda2.default.has(parameter, 'value')) return false;

    return true;
};

var isValidLocation = function isValidLocation(location) {
    return _ramda2.default.both(_ramda2.default.has(location, 'latitude'), _ramda2.default.has(location, 'longitude'));
};

exports.default = { PULSE: PULSE, WEIGHT: WEIGHT, LOCATION: LOCATION, isValidParameter: isValidParameter, isValidType: isValidType, isValidLocation: isValidLocation };