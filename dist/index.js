'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNotValid = exports.isValid = exports.validator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validate = function validate(toValidate, validations) {
    return _ramda.splitEvery.reduce(function (errors, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            fieldName = _ref2[0],
            validationGroup = _ref2[1];

        var errorMessages = errorMessagesFor(toValidate[fieldName], validationGroup);

        return _validator2.default.notEmpty(errorMessages) ? _extends({}, errors, _defineProperty({}, fieldName, errorMessages)) : errors;
    }, {}, _ramda.splitEvery.toPairs(validations));
};

var errorMessagesFor = function errorMessagesFor(toValidate, messagePairs) {
    return _ramda.splitEvery.map(_ramda.splitEvery.head, _ramda.splitEvery.filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            validFn = _ref4[1];

        return _ramda.splitEvery.not(validFn(toValidate));
    }, _ramda.splitEvery.splitEvery(2, messagePairs)));
};

var isValid = _ramda.splitEvery.isEmpty;
var isNotValid = _validator2.default.notEmpty = _ramda.splitEvery.complement(isValid);

exports.default = validate;
exports.validator = _validator2.default;
exports.isValid = isValid;
exports.isNotValid = isNotValid;