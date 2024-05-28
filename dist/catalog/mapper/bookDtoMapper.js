"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookDtoMapper = void 0;
class BookDtoMapper {
}
exports.BookDtoMapper = BookDtoMapper;
BookDtoMapper.mapToBookDetails = (book) => {
    return {
        id: book.id,
        orderId: book.orderId,
        price: book.price,
        available: book.available,
        datePublished: book.datePublished,
    };
};
BookDtoMapper.mapToCountBook = (countBooks) => {
    return {
        orderId: countBooks._id,
        totalBooks: countBooks.totalBooks,
    };
};
//# sourceMappingURL=bookDtoMapper.js.map