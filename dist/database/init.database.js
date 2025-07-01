"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabases = void 0;
const mongo_database_1 = require("@database/mongo.database");
const initializeDatabases = async () => {
    try {
        await (0, mongo_database_1.connectMongo)();
    }
    catch (err) {
        console.error('❌ Error initializing databases:', err);
        process.exit(1);
    }
};
exports.initializeDatabases = initializeDatabases;
