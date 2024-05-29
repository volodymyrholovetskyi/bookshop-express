import bodyParser from "body-parser";
import express from "express";
import sinon from "sinon";
import chai from "chai";
import chaiHttp from "chai-http";
import routers from "src/shared/routers/bookRouter";
import Book from "src/catalog/models/book";
import { ObjectId } from "mongodb";
const client = require("src/catalog/client/httpClient")
const service = require("src/catalog/services/bookService")

const { expect } = chai;

chai.use(chaiHttp);
chai.should();

const sandbox = sinon.createSandbox();

const app = express();

app.use(bodyParser.json({ limit: "1mb" }));
app.use('/', routers);
const basePath = '/api/books';

describe("Controller Book", () => {

  afterEach(() => {
    sandbox.restore();
  });

  it("Should save the book", (done) => {
    const bookIdAfterSave = new ObjectId();
    const book = {
      title: "Title",
      description: "Descripiton",
      price: 12.99,
      orderId: 1,
      available: 100,
      datePublished: "2024-03-25",
    };

    const saveOneStub = sandbox.stub(
      Book.prototype,
      "save",
    );
    saveOneStub.resolves({
      ...book,
      id: bookIdAfterSave,
    });

    const mock = sandbox.mock(client)
    mock.expects("fetchOrder")
      .withArgs(1)
      .once()
      .returns({ ok: true })

    chai.request(app)
      .post(basePath)
      .send(book)
      .end((_, res) => {
        res.should.have.status(201);
        expect(res.body.id).to.equal(bookIdAfterSave.toString());

        done();
      });
  });

  it("countBooks should return the counted books for each orderdId", (done) => {
    const orderIds = [1,2]
    const books = [
      {
        orderId: 1,
        totalBooks: 2
      },
      {
        orderId: 2,
        totalBooks: 5
      }
    ]

    const findOneStub = sandbox.stub(Book, "aggregate")
    findOneStub.resolves(books);

    chai.request(app)
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
        id: new ObjectId().toString(),
        title: 'Title',
        descripiotn: 'Description',
        price: 12.50,
        orderId: 1,
        available: 12,
        datePublished: '2024-10-10'
      },
      {
        id: new ObjectId().toString(),
        title: 'Title 2',
        descripiotn: 'Description 2',
        price: 15.00,
        orderId: 1,
        available: 20,
        datePublished: '2024-10-20'
      }
    ]

    const findOneStub = sandbox.stub(service, "findBooksByOrderId")
    findOneStub.resolves(books);

    chai.request(app)
      .get(`${basePath}?orderId=1`)
      .end((_, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal(books);

        done();
      });
  });
});


