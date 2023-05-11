import { ChangeEvent, useState } from "react";
import { isEmpty, isString } from "./utils";
import { HandleInputChangeType, HookParams, Errors } from "./types";

function useValidations<T>({ defaultData, validators }: HookParams<T>): {
  data: T;
  errors: Errors<T>;
  emptyForm: boolean;
  handleInputChange: HandleInputChangeType;
  hasErrors: boolean;
  doValidate: () => boolean;
  resetData: () => void;
} {
  const [data, setData] = useState<T>(defaultData);

  const [errors, setErrors] = useState<Errors<T>>({});

  const hasErrors = Object.values(errors as Errors<T>).some(isString);
  const emptyForm = data && Object.values(data).every(isEmpty);

  const handleInputChange =
    (field: string) =>
    (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (typeof value !== "string") {
        value = value.target.value;
      }

      if (typeof validators[field] === "function") {
        setErrors({ ...errors, [field]: validators[field](value, data) });
      }

      setData((prevData: T) => ({ ...prevData, [field]: value }));
    };

  const doValidate = () => {
    const validationsStack = Object.keys(validators).map((field: string) => {
      const validation: string | null = validators[field](
        (data as any)[field],
        data
      );

      if (validation === null) {
        return true;
      } else {
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
