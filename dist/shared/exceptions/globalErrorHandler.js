"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const orderNotFoundError_1 = require("./orderNotFoundError");
const bookValidationError_1 = require("./bookValidationError");
const appError_1 = require("./appError");
const http_status_1 = __importDefault(require("http-status"));
const errorHandler = (error, req, res, next) => {
    if (error instanceof orderNotFoundError_1.OrderNotFoundError) {
        return buildErrorResponse(http_status_1.default.NOT_FOUND, http_status_1.default["404_NAME"], error.message, res);
    }
    if (error instanceof bookValidationError_1.BookValidationError) {
        return buildErrorResponse(http_status_1.default.BAD_REQUEST, http_status_1.default["400_NAME"], error.message, res);
    }
    return buildErrorResponse(http_status_1.default.INTERNAL_SERVER_ERROR, http_status_1.default["500_NAME"], error.message, res);
};
exports.errorHandler = errorHandler;
const buildErrorResponse = (statusCode, status, message, res) => {
    return res.status(statusCode).send(new appError_1.AppError(status, statusCode, message));
};
//# sourceMappingURL=globalErrorHandler.js.map