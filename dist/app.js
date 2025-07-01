"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const error_middleware_1 = __importDefault(require("@middleware/error.middleware"));
const api_routes_1 = __importDefault(require("@routes/api.routes"));
const i18n_config_1 = __importDefault(require("@config/i18n.config"));
const logger_utils_1 = __importDefault(require("@utils/logger.utils"));
const init_database_1 = require("@database/init.database");
class App {
    constructor(port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeDatabases();
        this.initializeMiddleware();
        this.initializeLocalization();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: true }));
        this.express.use((0, compression_1.default)());
    }
    initializeRoutes() {
        this.express.use('/api', api_routes_1.default);
    }
    initializeErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initializeDatabases() {
        (0, init_database_1.initializeDatabases)();
    }
    ;
    initializeLocalization() {
        this.express.use(i18n_config_1.default.init);
    }
    listen() {
        this.express.listen(this.port, () => {
            (0, logger_utils_1.default)(`✅ App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
