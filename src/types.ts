import { ChangeEvent } from "react";

export type HandleInputChangeType = (
  field: string
) => (
  value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type Validators<T> = { [field: string]: (v: string, data?: T) => string | null };

export type HookParams<T> = {
  defaultData?: Partial<T>,
  validators: Validators<T | {}>
}

export type Stringify<T> = {
  [K in keyof T]?: string | null;
};

export type Errors<T> = Stringify<T>;
