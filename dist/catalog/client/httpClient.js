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
exports.featchOrder = void 0;
const httpClientTimoutError_1 = require("../../shared/exceptions/httpClientTimoutError");
const httpClientError_1 = require("../../shared/exceptions/httpClientError");
const config_1 = require("../../shared/config");
const log4js_1 = __importDefault(require("log4js"));
const TIMEOUT_ERROR = "TimeoutError";
const TIMEOUT_DURATION = 2000; //2s
const featchOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${config_1.httpClient.url_api}/${orderId}`, {
        signal: AbortSignal.timeout(TIMEOUT_DURATION),
        method: "GET",
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    })
        .then((result) => result)
        .catch((err) => {
        if (err.name === TIMEOUT_ERROR) {
            log4js_1.default.getLogger().error("Timeout occurred while connecting...", err);
            throw new httpClientTimoutError_1.HttpClientTimeoutError(err);
        }
        log4js_1.default.getLogger().error("Error occurred while connecting...", err);
        throw new httpClientError_1.HttpClientError(err);
    });
});
exports.featchOrder = featchOrder;
//# sourceMappingURL=httpClient.js.map