const hasOwnProperty = Object.prototype.hasOwnProperty;
const objectProto = Object.prototype;
function isPrototype(value) {
    const Ctor = value && value.constructor;
    const proto = (typeof Ctor === "function" && Ctor.prototype) || objectProto;
    return value === proto;
}
function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (Array.isArray(value) ||
        typeof value === "string") {
        return !value.length;
    }
    if (isPrototype(value)) {
        return !Object.keys(value).length;
    }
    for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return true;
}
const isString = (value) => typeof value === "string";
export { isEmpty, isString };
