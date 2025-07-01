"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("@controllers/controller"));
const http_response_1 = __importDefault(require("@utils/http.response"));
class AuthController extends controller_1.default {
    constructor() {
        super(...arguments);
        this.register = async (req, res, next) => {
            const request = req.body;
            return new http_response_1.default(res).success(request, 'User registered successfully');
        };
    }
}
exports.default = new AuthController;
