'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _influx = require('influx');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var influx = new _influx.InfluxDB({
  host: 'influx',
  database: 'express_response_db',
  schema: [{
    measurement: 'location',
    fields: {
      latitude: _influx.FieldType.FLOAT,
      longitude: _influx.FieldType.FLOAT
    },
    tags: ['user']
  }, {
    measurement: 'hearthrate',
    fields: {
      value: _influx.FieldType.INTEGER
    },
    tags: ['user']
  }, {
    measurement: 'weight',
    fields: {
      value: _influx.FieldType.FLOAT
    },
    tags: ['user']
  }]
});

var saveTemporalParameter = _ramda2.default.curry(function (parameter, user) {
  return influx.writePoints([{
    measurement: parameter.type,
    tags: { user: user },
    fields: _extends({}, parameter.fields)
  }]);
});

exports.default = saveTemporalParameter;