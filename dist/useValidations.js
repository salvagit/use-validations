var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useState } from "react";
import { isEmpty, isString } from "./utils";
export var noEmpty = function (value) { return (isEmpty(value) ? "required" : null); };
function useValidations(_a) {
    var defaultData = _a.defaultData, validators = _a.validators;
    var _b = useState(defaultData), data = _b[0], setData = _b[1];
    var _c = useState([]), errors = _c[0], setErrors = _c[1];
    var hasErrors = Object.values(errors).some(isString);
    var emptyForm = data && Object.values(data).every(isEmpty);
    var handleInputChange = function (field) {
        return function (value) {
            var _a;
            if (typeof value !== "string") {
                value = value.target.value;
            }
            if (typeof validators[field] === "function") {
                setErrors(__assign(__assign({}, errors), (_a = {}, _a[field] = validators[field](value, data), _a)));
            }
            setData(function (prevData) {
                var _a;
                return (__assign(__assign({}, prevData), (_a = {}, _a[field] = value, _a)));
            });
        };
    };
    var doValidate = function () {
        var validationsStack = Object.keys(validators).map(function (field) {
            var validation = validators[field](data[field], data);
            if (validation === null) {
                return true;
            }
            else {
                setErrors(function (oldErrors) {
                    var _a;
                    return (__assign(__assign({}, oldErrors), (_a = {}, _a[field] = validation, _a)));
                });
                return false;
            }
        });
        return validationsStack.every(Boolean);
    };
    var resetData = function () {
        setData(defaultData);
    };
    return {
        data: data,
        emptyForm: emptyForm,
        errors: errors,
        handleInputChange: handleInputChange,
        hasErrors: hasErrors,
        doValidate: doValidate,
        resetData: resetData,
    };
}
export default useValidations;
//# sourceMappingURL=useValidations.js.map