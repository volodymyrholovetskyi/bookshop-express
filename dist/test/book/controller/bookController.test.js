"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const bookRouter_1 = __importDefault(require("src/shared/routers/bookRouter"));
const book_1 = __importDefault(require("src/catalog/models/book"));
const mongodb_1 = require("mongodb");
const { expect } = chai_1.default;
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
const sandbox = sinon_1.default.createSandbox();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "1mb" }));
app.use('/', bookRouter_1.default);
const basePath = '/api/books';
describe("POST Create Book", () => {
    afterEach(() => {
        sandbox.restore();
    });
    it("Should save the book", (done) => {
        const bookIdAfterSave = new mongodb_1.ObjectId();
        const book = {
            title: "Title",
            description: "Descripiton",
            price: 12.99,
            orderId: 1,
            available: 100,
            datePublished: "2024-03-25",
        };
        const saveOneStub = sandbox.stub(book_1.default.prototype, "save");
        saveOneStub.resolves(Object.assign(Object.assign({}, book), { id: bookIdAfterSave }));
        chai_1.default.request(app)
            .post(basePath)
            .send(book)
            .end((_, res) => {
            res.should.have.status(201);
            expect(res.body.id).to.equal(bookIdAfterSave.toString());
            done();
        });
    });
    // it("Should return 400 because it fails validation", (done) => {
    //   const bookIdAfterSave = new ObjectId();
    //   const book = {
    //     title: "Title",
    //     description: "Description 1",
    //     price: -1,
    //     orderId: 1,
    //     available: 20,
    //     datePublished: "2024-03-25",
    //   };
    // const saveOneStub = sandbox.stub(
    //   Book.prototype,
    //   "save",
    // );
    // saveOneStub.resolves({
    //   ...book,
    //   id: bookIdAfterSave,
    // });
    //   chai.request(app)
    //     .post(basePath)
    //     .send(book)
    //     .end((_, res) => {
    //       res.should.have.status(400);
    //       // expect(res.body.message.length).to.equal(6);
    //       done();
    //     });
    // });
    it("countBooks should return the counted books for each orderdId", (done) => {
        const orderIds = [1, 2];
        const books = [
            {
                orderId: 1,
                totalBooks: 2
            },
            {
                orderId: 2,
                totalBooks: 5
            }
        ];
        const findOneStub = sandbox.stub(book_1.default, "aggregate");
        findOneStub.resolves(books);
        chai_1.default.request(app)
            .post(`${basePath}/_counts`)
            .send(orderIds)
            .end((_, res) => {
            res.should.have.status(200);
            expect(res.body.length).to.eql(2);
            done();
        });
    });
    it("findBooks should return a list of books by orderId", (done) => {
        const books = [
            {
                id: new mongodb_1.ObjectId().toString(),
                title: 'Title',
                descripiotn: 'Description',
                price: 12.50,
                orderId: 1,
                available: 12,
                datePublished: '2024-10-10'
            },
            {
                id: new mongodb_1.ObjectId().toString(),
                title: 'Title 2',
                descripiotn: 'Description 2',
                price: 15.00,
                orderId: 1,
                available: 20,
                datePublished: '2024-10-20'
            }
        ];
        console.log("Test Before... ");
        const findOneStub = sandbox.stub(book_1.default, "find");
        findOneStub.resolves(books);
        console.log("Test After... ");
        chai_1.default.request(app)
            .get(`${basePath}?orderId=1`)
            .end((_, res) => {
            res.should.have.status(200);
            expect(res.body).to.deep.equal(books);
            done();
        });
    });
});
//# sourceMappingURL=bookController.test.js.map