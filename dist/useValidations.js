import { useState } from "react";
import { isEmpty, isString } from "./utils";
function useValidations({ defaultData, validators }) {
    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const hasErrors = Object.values(errors).some(isString);
    const emptyForm = data && Object.values(data).every(isEmpty);
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
export default useValidations;
