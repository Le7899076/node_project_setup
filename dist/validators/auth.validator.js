"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const register = joi_1.default.object({
    firstName: joi_1.default.string().required().messages({
        'string.empty': 'First name is required',
        'any.required': 'First name is required',
    }),
    lastName: joi_1.default.string().required().messages({
        'string.empty': 'Last name is required',
        'any.required': 'Last name is required',
    }),
    email: joi_1.default.string().required().messages({
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
    }),
});
exports.default = { register };
