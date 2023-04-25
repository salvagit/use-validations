const hasOwnProperty = Object.prototype.hasOwnProperty;

const objectProto = Object.prototype;

function isPrototype(value: {}) {
  const Ctor = value && value.constructor;
  const proto = (typeof Ctor === "function" && Ctor.prototype) || objectProto;

  return value === proto;
}

function isEmpty(value: unknown) {
  if (value == null) {
    return true;
  }

  if (
    Array.isArray(value) ||
    typeof value === "string"
  ) {
    return !value.length;
  }

  if (isPrototype(value as any)) {
    return !Object.keys(value as any).length;
  }

  for (const key in value as any) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

const isString = (value: unknown): boolean => typeof value === "string";

export { isEmpty, isString };
