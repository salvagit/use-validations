var hasOwnProperty = Object.prototype.hasOwnProperty;
var objectProto = Object.prototype;
function isPrototype(value) {
    var Ctor = value && value.constructor;
    var proto = (typeof Ctor === "function" && Ctor.prototype) || objectProto;
    return value === proto;
}
function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (Array.isArray(value) ||
        typeof value === "string"
    // typeof value.splice === "function"
    ) {
        return !value.length;
    }
    // const tag = value.toString();
    // if (tag == "[object Map]" || tag == "[object Set]") {
    //   return !value.size;
    // }
    if (isPrototype(value)) {
        return !Object.keys(value).length;
    }
    for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return true;
}
var isString = function (value) { return typeof value === "string"; };
export { isEmpty, isString };
//# sourceMappingURL=utils.js.map