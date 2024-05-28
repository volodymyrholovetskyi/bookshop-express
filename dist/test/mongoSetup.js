"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
const connectionPromise = new Promise((resolve, reject) => {
    mongoServer.start()
        .then(() => {
        const mongoUri = mongoServer.getUri();
        const mongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 30000,
        };
        mongoose_1.default.connect(mongoUri, mongooseOpts);
        mongoose_1.default.connection.on('connected', () => {
            resolve(mongoose_1.default.connection);
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error('Mockgoose error');
            console.error(err);
            if (err.message.code === 'ETIMEDOUT') {
                mongoose_1.default.connect(mongoUri, mongooseOpts);
            }
        });
        return null;
    })
        .catch((err) => {
        console.error('Error in prepareStorage');
        console.error(err);
        reject(err);
    });
});
/**
 * This promise is resolved when the test database
 * is ready and the connection has been made.
 */
exports.default = connectionPromise;
//# sourceMappingURL=mongoSetup.js.map