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
exports.findBooksByOrderId = exports.countBooksForOrderIds = exports.addBook = void 0;
const bookFactory_1 = require("../mapper/bookFactory");
const book_1 = __importDefault(require("../models/book"));
const bookDtoMapper_1 = require("../mapper/bookDtoMapper");
const httpClient_1 = require("../client/httpClient");
const orderNotFoundError_1 = require("../../shared/exceptions/orderNotFoundError");
const addBook = (bookDto) => __awaiter(void 0, void 0, void 0, function* () {
    yield validateOrder(bookDto.orderId);
    const book = yield bookFactory_1.BookFactory.createNewBook(bookDto).save();
    return book.id;
});
exports.addBook = addBook;
const countBooksForOrderIds = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderIds } = query;
    const countBooks = yield book_1.default.aggregate([
        {
            $match: {
                orderId: { $in: orderIds },
            },
        },
        {
            $group: {
                _id: "$orderId",
                totalBooks: { $sum: 1 },
            },
        },
    ]);
    return countBooks.map((countBook) => bookDtoMapper_1.BookDtoMapper.mapToCountBook(countBook));
});
exports.countBooksForOrderIds = countBooksForOrderIds;
const findBooksByOrderId = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, size, from } = query;
    const books = yield book_1.default.find({ orderId: orderId })
        .sort({ datePublished: -1 })
        .skip(from)
        .limit(size);
    return books.map((book) => bookDtoMapper_1.BookDtoMapper.mapToBookDetails(book));
});
exports.findBooksByOrderId = findBooksByOrderId;
const validateOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, httpClient_1.featchOrder)(orderId);
    if (!res.ok) {
        throw new orderNotFoundError_1.OrderNotFoundError(orderId);
    }
});
//# sourceMappingURL=bookService.js.map