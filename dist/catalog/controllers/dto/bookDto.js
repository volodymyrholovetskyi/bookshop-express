"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookDto = void 0;
class BookDto {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.price = data.price;
        this.orderId = data.orderId;
        this.available = data.available;
        this.datePublished = data.datePublished;
    }
}
exports.BookDto = BookDto;
//# sourceMappingURL=bookDto.js.map