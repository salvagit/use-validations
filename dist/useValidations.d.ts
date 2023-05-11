import { HandleInputChangeType, HookParams, Errors } from "./types";
declare function useValidations<T>({ defaultData, validators }: HookParams<T>): {
    data: T;
    errors: Errors<T>;
    emptyForm: boolean;
    handleInputChange: HandleInputChangeType;
    hasErrors: boolean;
    doValidate: () => boolean;
    resetData: () => void;
};
export default useValidations;
