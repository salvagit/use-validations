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