"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const validateEnv_1 = __importDefault(require("@utils/validateEnv"));
const app_1 = __importDefault(require("./app"));
(0, validateEnv_1.default)();
const app = new app_1.default(Number(process.env.PORT));
app.listen();
// Handle termination
process.on('SIGINT', () => {
    console.log('\n⛔ Build interrupted (Ctrl+C)');
    process.exit(1);
});
process.on('SIGTERM', () => {
    console.log('\n⛔ Build terminated');
    process.exit(1);
});
process.on('exit', code => {
    console.log(`👋 Exiting with code ${code}`);
});
