"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajv = void 0;
const ajv_1 = __importDefault(require("ajv"));
// Singleton Ajv instance
const Ajv = globalThis?.Ajv ||
    globalThis?.ajv2020 ||
    ajv_1.default;
exports.ajv = new Ajv({
    allErrors: true,
    allowUnionTypes: true,
});
