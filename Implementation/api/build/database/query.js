'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* This class constains all the constraints
* a client may made and holds the results 
* when the searchs are performed.
* It offers helpers too
*/

var Query = function () {
    function Query(query) {
        _classCallCheck(this, Query);

        this.temporalParameters = {
            location: query.location,
            weight: query.weight,
            hearthrate: query.hearthrate
        };

        this.fixedParameters = {
            residence: query.residence,
            age: query.age,
            genre: query.genre
        };

        this.results = [];
    }

    _createClass(Query, [{
        key: 'haveFixedParameters',
        value: function haveFixedParameters() {
            return true;
        }
    }, {
        key: 'haveTemporalParameters',
        value: function haveTemporalParameters() {
            return this.haveWeight() || this.haveHearthRate() || this.haveLocation();
        }
    }, {
        key: 'haveWeight',
        value: function haveWeight() {
            return !_ramda2.default.isNil(this.temporalParameters.weight);
        }
    }, {
        key: 'haveHearthRate',
        value: function haveHearthRate() {
            return !_ramda2.default.isNil(this.temporalParameters.hearthrate);
        }
    }, {
        key: 'haveLocation',
        value: function haveLocation() {
            return !_ramda2.default.isNil(this.temporalParameters.location);
        }
    }, {
        key: 'buildResults',
        value: function buildResults() {}
    }]);

    return Query;
}();

exports.default = Query;


var isFixedQuery = _ramda2.default.compose(isNotEmpty, _ramda2.default.props('residence', 'age', 'genre'));
var isTemporalQuery = _ramda2.default.compose(isNotEmpty, _ramda2.default.props('location', 'weight', 'hearthrate'));
var haveWeightOrHearthRate = _ramda2.default.compose(isNotEmpty, _ramda2.default.props('weight', 'hearthrate'));

var anyNotNil = _ramda2.default.any(_ramda2.default.isNil);
var haveProps = function haveProps(props, object) {
    return _ramda2.default.compose(isNotEmpty, _ramda2.default.props(props))(object);
};

var isNotEmpty = _ramda2.default.compose(_ramda2.default.not, _ramda2.default.isEmpty);