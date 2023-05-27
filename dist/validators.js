import { isEmpty } from "./utils";
export const isRequired = (value) => isEmpty(value) ? "required" : null;
