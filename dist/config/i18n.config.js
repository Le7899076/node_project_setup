"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("i18n"));
const path_1 = __importDefault(require("path"));
const app_config_1 = __importDefault(require("@config/app.config"));
i18n_1.default.configure({
    locales: app_config_1.default.supported_languages, // Add other locales as needed
    defaultLocale: app_config_1.default.locale,
    directory: path_1.default.join(__dirname, '../locales'),
    autoReload: true,
    updateFiles: false,
    objectNotation: true,
    cookie: 'lang', // optional if you're supporting frontend cookies
});
exports.default = i18n_1.default;
