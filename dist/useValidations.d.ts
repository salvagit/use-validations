import { HandleInputChangeType, HookParams } from "./types";
declare function useValidations<T>({ defaultData, validators }: HookParams<T>): {
    data: T;
    errors: any;
    emptyForm: boolean;
    handleInputChange: HandleInputChangeType;
    hasErrors: boolean;
    doValidate: () => boolean;
    resetData: () => void;
};
export default useValidations;
