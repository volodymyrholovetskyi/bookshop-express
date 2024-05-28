"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.createBook = exports.findBooks = exports.countBooks = void 0;
const bookDto_1 = require("./dto/bookDto");
const catalogValidator_1 = require("../../shared/validators/catalogValidator");
const bookService_1 = require("../services/bookService");
const http_status_1 = __importDefault(require("http-status"));
const bookQueryDto_1 = require("./dto/bookQueryDto");
const orderIdsDto_1 = require("./dto/orderIdsDto");
const bookValidationError_1 = require("../../shared/exceptions/bookValidationError");
const log4js_1 = __importDefault(require("log4js"));
const countBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        validate(yield (0, catalogValidator_1.validationPipe)(OrderIdsRequest, req.body));
        const countBooks = new orderIdsDto_1.OrderIdsDto(req.body);
        const books = yield (0, bookService_1.countBooksForOrderIds)(countBooks);
        return res.status(http_status_1.default.OK).send(books);
    }
    catch (err) {
        log4js_1.default.getLogger().error("Error in count books.", err);
        return next(err);
    }
});
exports.countBooks = countBooks;
const findBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("START TEST...");
    try {
        validate(yield (0, catalogValidator_1.validationPipe)(BookQueryRequest, req.query));
        const bookQuery = new bookQueryDto_1.BookQueryDto(req.query);
        const books = yield (0, bookService_1.findBooksByOrderId)(Object.assign({}, bookQuery));
        console.log("END TEST...");
        return res.status(http_status_1.default.OK).send(books);
    }
    catch (err) {
        log4js_1.default.getLogger().error("Error in searching books.", err);
        console.log("ERROR TEST...");
        return next(err);
    }
});
exports.findBooks = findBooks;
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        validate(yield (0, catalogValidator_1.validationPipe)(BookRequest, req.body));
        const book = new bookDto_1.BookDto(req.body);
        const id = yield (0, bookService_1.addBook)(Object.assign({}, book));
        return res.status(http_status_1.default.CREATED).send({ id });
    }
    catch (err) {
        log4js_1.default.getLogger().error("Error in creating book.", err);
        return next(err);
    }
});
exports.createBook = createBook;
class BookRequest {
}
__decorate([
    (0, catalogValidator_1.IsNotEmpty)(),
    (0, catalogValidator_1.IsString)()
], BookRequest.prototype, "title", void 0);
__decorate([
    (0, catalogValidator_1.IsNotEmpty)(),
    (0, catalogValidator_1.IsString)()
], BookRequest.prototype, "description", void 0);
__decorate([
    (0, catalogValidator_1.IsNumber)(),
    (0, catalogValidator_1.Min)(0)
], BookRequest.prototype, "price", void 0);
__decorate([
    (0, catalogValidator_1.IsNumber)(),
    (0, catalogValidator_1.Min)(1)
], BookRequest.prototype, "orderId", void 0);
__decorate([
    (0, catalogValidator_1.IsNumber)(),
    (0, catalogValidator_1.Min)(0)
], BookRequest.prototype, "available", void 0);
__decorate([
    (0, catalogValidator_1.IsISO8601)()
], BookRequest.prototype, "datePublished", void 0);
class BookQueryRequest {
}
__decorate([
    (0, catalogValidator_1.IsNotEmpty)()
], BookQueryRequest.prototype, "orderId", void 0);
__decorate([
    (0, catalogValidator_1.IsOptional)()
], BookQueryRequest.prototype, "size", void 0);
__decorate([
    (0, catalogValidator_1.IsOptional)()
], BookQueryRequest.prototype, "from", void 0);
class OrderIdsRequest {
}
__decorate([
    (0, catalogValidator_1.ArrayNotEmpty)(),
    (0, catalogValidator_1.IsArray)()
], OrderIdsRequest.prototype, "orderIds", void 0);
const validate = (errors) => {
    if (errors.length > 0) {
        throw new bookValidationError_1.BookValidationError(formatError(errors));
    }
};
const formatError = (validationErrors) => {
    let errors = [];
    for (let error of validationErrors) {
        if (error.constraints !== undefined) {
            errors.push(JSON.stringify(error.constraints));
        }
    }
    return errors.join(", ");
};
//# sourceMappingURL=bookController.js.map