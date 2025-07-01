"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("@controllers/user/post.controller"));
const validation_middleware_1 = __importDefault(require("@middleware/validation.middleware"));
const post_validator_1 = __importDefault(require("@validators/post.validator"));
const auth_validator_1 = __importDefault(require("@validators/auth.validator"));
const auth_controller_1 = __importDefault(require("@controllers/user/auth.controller"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router
    .get('/posts', post_controller_1.default.index)
    .post('/posts', (0, validation_middleware_1.default)(post_validator_1.default.create), post_controller_1.default.create);
router
    .post('/users/register', upload.none(), (0, validation_middleware_1.default)(auth_validator_1.default.register), auth_controller_1.default.register);
exports.default = router;
