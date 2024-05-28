"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    constructor(status, statusCode, message) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.js.map