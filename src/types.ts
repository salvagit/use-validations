import { ChangeEvent } from "react";

export type HandleInputChangeType = (
  field: string
) => (
  value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type HookParams<T> = {
  defaultData: T,
  validators: {
    [field: string]: (v: string, data?: T) => string | null;
  }
}

export type Stringify<T> = {
  [K in keyof T]?: string | null;
};

export type Errors<T> = Stringify<T>;
