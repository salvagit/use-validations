import { ChangeEvent } from "react";
export declare type HandleInputChangeType = (field: string) => (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export declare const noEmpty: (value: string) => "required" | null;
export declare type HookParams<T> = {
    defaultData: T;
    validators: {
        [field: string]: (v: string, data?: T) => string | null;
    };
};
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
