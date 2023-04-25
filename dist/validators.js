"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequired = void 0;
const utils_1 = require("./utils");
const isRequired = (value) => ((0, utils_1.isEmpty)(value) ? "required" : null);
exports.isRequired = isRequired;
