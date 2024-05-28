"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRouter_1 = __importDefault(require("./shared/routers/bookRouter"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const globalErrorHandler_1 = require("./shared/exceptions/globalErrorHandler");
const log4js_1 = __importDefault(require("log4js"));
const config_1 = require("./shared/config");
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27018/catalog";
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json({ limit: "1mb" }));
    app.use("/", bookRouter_1.default);
    app.use(globalErrorHandler_1.errorHandler);
    log4js_1.default.configure(config_1.config.log4js);
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}. Server ready...`);
    });
    yield mongoose_1.default.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000,
    });
});
//# sourceMappingURL=app.js.map