"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookFactory = void 0;
const book_1 = __importDefault(require("../models/book"));
class BookFactory {
}
exports.BookFactory = BookFactory;
BookFactory.createNewBook = (book) => {
    return new book_1.default(Object.assign({}, book));
};
//# sourceMappingURL=bookFactory.js.map