import sinon from "sinon";
import chai from "chai";
import { BookDto } from "src/catalog/controllers/dto/bookDto";
import Book from "src/catalog/models/book";
import mongoSetup from "../../mongoSetup";
import { ObjectId } from "mongodb";
import * as bookService from "src/catalog/services/bookService";
import { BookQueryDto } from "src/catalog/controllers/dto/bookQueryDto";
import { OrderIdsDto } from "src/catalog/controllers/dto/orderIdsDto";
const client = require("src/catalog/client/httpClient")

const { expect } = chai;

const sandbox = sinon.createSandbox();

const typeScriptInAction = new Book({
  _id: new ObjectId(),
  title: "TypeScript in Action",
  description:
    "TypeScript in Action: Building Modern Web Applications with TypeScript",
  orderId: 1,
  price: 23,
  available: 10,
  datePublished: new Date("2023-11-13"),
});

const effectiveTipeScript = new Book({
  _id: new ObjectId(),
  title: "TypeScript in Action",
  description:
    "This book guides you through 62 specific ways to improve your use of TypeScript.",
  orderId: 1,
  price: 35,
  available: 5,
  datePublished: new Date("2019-10-29"),
});

describe("Book Service", () => {
  before(async () => {
    await mongoSetup;

    await typeScriptInAction.save();
    await effectiveTipeScript.save();
  });

  beforeEach(() => {
    sandbox.restore();
  });

  it("findBooksByOrderId should return a list of books by orderId", (done) => {
    //given
    const savedBooks = [typeScriptInAction, effectiveTipeScript];
    const queryPartial: Partial<BookQueryDto> = {
      orderId: 1,
      from: 0,
      size: 2,
    };
    const query: BookQueryDto = new BookQueryDto(queryPartial);

    //expect
    bookService
      .findBooksByOrderId(query)
      .then((books) => {
        expect(books.length).to.equal(2);
        expect(books.map((book) => book.id.toString())).to.eql(
          savedBooks.map((book) => book.id.toString())
        );
        done();
      })
      .catch((error: Error) => done(error));
  });

  it("findBooksByOrderId should return empty list", (done) => {
    //given
    const queryPartial: Partial<BookQueryDto> = {
      orderId: 1,
      from: 2,
      size: 2,
    };
    const query: BookQueryDto = new BookQueryDto(queryPartial);

    //expect
    bookService
      .findBooksByOrderId(query)
      .then((books) => {
        expect(books.length).to.equal(0);
        done();
      })
      .catch((error: Error) => done(error));
  });

  it("countBooksForOrderIds should return the counted books for each ID", (done) => {
    //given
    const orderIdsPartial: Partial<OrderIdsDto> = { orderIds: [1, 2] };
    const orderIdsDto: OrderIdsDto = new OrderIdsDto(orderIdsPartial);

    //expect
    bookService
      .countBooksForOrderIds(orderIdsDto)
      .then((countBooks) => {
        expect(countBooks.length).to.equal(1);
        expect(countBooks[0].orderId).to.equal(1);
        expect(countBooks[0].totalBooks).to.eql(2);
        done();
      })
      .catch((error: Error) => done(error));
  });


  it("addBook should create a new book and return its id", (done) => {
    //given
    const myApi = {featchOrder: function(){}}
    const bookDto: BookDto = {
      title: "Clean Code",
      description: "Write good quality readable and reusable code",
      orderId: 1,
      price: 45,
      available: 50,
      datePublished: new Date("2008-08-01"),
    };

    const aStub = sandbox.mock(client)
    aStub.expects("fetchOrder")
      .withArgs(1)
      .once()
      .returns({ ok: true })
    
    //expect
    bookService
      .addBook(bookDto)
      .then(async (id) => {
        const book = await Book.findById(id);

        expect(book).to.exist;
        expect(book?.title).to.equal(bookDto.title);
        expect(book?.description).to.equal(bookDto.description);
        expect(book?.orderId).to.eql(bookDto.orderId);
        expect(book?.price).to.eql(bookDto.price);
        expect(book?.available).to.eql(bookDto.available);
        expect(book?.datePublished).to.eql(bookDto.datePublished);

        done();
      })
      .catch((error: Error) => done(error));
  });
});
