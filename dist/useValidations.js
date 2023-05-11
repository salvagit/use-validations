"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const utils_1 = require("./utils");
function useValidations({ defaultData, validators }) {
    const [data, setData] = (0, react_1.useState)(defaultData);
    const [errors, setErrors] = (0, react_1.useState)({});
    const hasErrors = Object.values(errors).some(utils_1.isString);
    const emptyForm = data && Object.values(data).every(utils_1.isEmpty);
    const handleInputChange = (field) => (value) => {
        if (typeof value !== "string") {
            value = value.target.value;
        }
        if (typeof validators[field] === "function") {
            setErrors({ ...errors, [field]: validators[field](value, data) });
        }
        setData((prevData) => ({ ...prevData, [field]: value }));
    };
    const doValidate = () => {
        const validationsStack = Object.keys(validators).map((field) => {
            const validation = validators[field](data[field], data);
            if (validation === null) {
                return true;
            }
            else {
                setErrors((oldErrors) => ({ ...oldErrors, [field]: validation }));
                return false;
            }
        });
        return validationsStack.every(Boolean);
    };
    const resetData = () => {
        setData(defaultData);
    };
    return {
        data,
        emptyForm,
        errors,
        handleInputChange,
        hasErrors,
        doValidate,
        resetData,
    };
}
exports.default = useValidations;
