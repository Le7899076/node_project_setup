"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const logger_utils_1 = __importDefault(require("@utils/logger.utils"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongo = async () => {
    const { MONGO_URL } = process.env;
    if (!MONGO_URL)
        throw new Error('MONGO_URL not set');
    try {
        await mongoose_1.default.connect(MONGO_URL);
        (0, logger_utils_1.default)('✅ MongoDB connected');
    }
    catch (err) {
        console.error('❌ MongoDB connection error:', err);
        throw err;
    }
};
exports.connectMongo = connectMongo;
