import { isEmpty } from "./utils";

export const isRequired = (value: string) =>
  isEmpty(value) ? "required" : null;
