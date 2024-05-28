"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookQueryDto = void 0;
class BookQueryDto {
    constructor(query) {
        this.orderId = query.orderId;
        this.from = query.from || 0;
        this.size = query.size || 10;
    }
}
exports.BookQueryDto = BookQueryDto;
//# sourceMappingURL=bookQueryDto.js.map