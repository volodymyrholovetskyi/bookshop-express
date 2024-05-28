"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderNotFoundError = void 0;
class OrderNotFoundError extends Error {
    constructor(orderId) {
        super(`Order with ID: ${orderId} not found!`);
    }
}
exports.OrderNotFoundError = OrderNotFoundError;
//# sourceMappingURL=orderNotFoundError.js.map