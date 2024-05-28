"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const book_1 = __importDefault(require("src/catalog/models/book"));
const mongoSetup_1 = __importDefault(require("../../mongoSetup"));
const mongodb_1 = require("mongodb");
const bookService = __importStar(require("src/catalog/services/bookService"));
const bookQueryDto_1 = require("src/catalog/controllers/dto/bookQueryDto");
const orderIdsDto_1 = require("src/catalog/controllers/dto/orderIdsDto");
const { expect } = chai_1.default;
const sandbox = sinon_1.default.createSandbox();
const typeScriptInAction = new book_1.default({
    _id: new mongodb_1.ObjectId(),
    title: "TypeScript in Action",
    description: "TypeScript in Action: Building Modern Web Applications with TypeScript",
    orderId: 1,
    price: 23,
    available: 10,
    datePublished: new Date("2023-11-13"),
});
const effectiveTipeScript = new book_1.default({
    _id: new mongodb_1.ObjectId(),
    title: "TypeScript in Action",
    description: "This book guides you through 62 specific ways to improve your use of TypeScript.",
    orderId: 1,
    price: 35,
    available: 5,
    datePublished: new Date("2019-10-29"),
});
describe("Book Service", () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoSetup_1.default;
        yield typeScriptInAction.save();
        yield effectiveTipeScript.save();
    }));
    beforeEach(() => {
        sandbox.restore();
    });
    it("findBooksByOrderId should return a list of books by orderId", (done) => {
        //given
        const savedBooks = [typeScriptInAction, effectiveTipeScript];
        const queryPartial = {
            orderId: 1,
            from: 0,
            size: 2,
        };
        const query = new bookQueryDto_1.BookQueryDto(queryPartial);
        //expect
        bookService
            .findBooksByOrderId(query)
            .then((books) => {
            expect(books.length).to.equal(2);
            expect(books.map((book) => book.id.toString())).to.eql(savedBooks.map((book) => book.id.toString()));
            done();
        })
            .catch((error) => done(error));
    });
    it("findBooksByOrderId should return empty list", (done) => {
        //given
        const queryPartial = {
            orderId: 1,
            from: 2,
            size: 2,
        };
        const query = new bookQueryDto_1.BookQueryDto(queryPartial);
        //expect
        bookService
            .findBooksByOrderId(query)
            .then((books) => {
            expect(books.length).to.equal(0);
            done();
        })
            .catch((error) => done(error));
    });
    it("countBooksForOrderIds should return the counted books for each ID", (done) => {
        //given
        const orderIdsPartial = { orderIds: [1, 2] };
        const orderIdsDto = new orderIdsDto_1.OrderIdsDto(orderIdsPartial);
        //expect
        bookService
            .countBooksForOrderIds(orderIdsDto)
            .then((countBooks) => {
            expect(countBooks.length).to.equal(1);
            expect(countBooks[0].orderId).to.equal(1);
            expect(countBooks[0].totalBooks).to.eql(2);
            done();
        })
            .catch((error) => done(error));
    });
    it("addBook should create a new book and return its id", (done) => {
        //given
        const bookDto = {
            title: "Clean Code",
            description: "Write good quality readable and reusable code",
            orderId: 1,
            price: 45,
            available: 50,
            datePublished: new Date("2008-08-01"),
        };
        //expect
        bookService
            .addBook(bookDto)
            .then((id) => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield book_1.default.findById(id);
            expect(book).to.exist;
            expect(book === null || book === void 0 ? void 0 : book.title).to.equal(bookDto.title);
            expect(book === null || book === void 0 ? void 0 : book.description).to.equal(bookDto.description);
            expect(book === null || book === void 0 ? void 0 : book.orderId).to.eql(bookDto.orderId);
            expect(book === null || book === void 0 ? void 0 : book.price).to.eql(bookDto.price);
            expect(book === null || book === void 0 ? void 0 : book.available).to.eql(bookDto.available);
            expect(book === null || book === void 0 ? void 0 : book.datePublished).to.eql(bookDto.datePublished);
            done();
        }))
            .catch((error) => done(error));
    });
    it("addBook should throws exception if order not found", (done) => {
        //given
        const bookDto = {
            title: "Clean Code",
            description: "Write good quality readable and reusable code",
            orderId: 1,
            price: 45,
            available: 50,
            datePublished: new Date("2008-08-01"),
        };
        //expect
        bookService
            .addBook(bookDto)
            .then((id) => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield book_1.default.findById(id);
            expect(book).to.exist;
            expect(book === null || book === void 0 ? void 0 : book.title).to.equal(bookDto.title);
            expect(book === null || book === void 0 ? void 0 : book.description).to.equal(bookDto.description);
            expect(book === null || book === void 0 ? void 0 : book.orderId).to.eql(bookDto.orderId);
            expect(book === null || book === void 0 ? void 0 : book.price).to.eql(bookDto.price);
            expect(book === null || book === void 0 ? void 0 : book.available).to.eql(bookDto.available);
            expect(book === null || book === void 0 ? void 0 : book.datePublished).to.eql(bookDto.datePublished);
            done();
        }))
            .catch((error) => done(error));
    });
});
//# sourceMappingURL=bookService.test.js.map