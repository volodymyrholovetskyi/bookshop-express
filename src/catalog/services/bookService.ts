import { BookFactory } from "../mapper/bookFactory";
import { BookDto } from "../controllers/dto/bookDto";
import { OrderIdsDto } from "../controllers/dto/orderIdsDto";
import { CountBookDto } from "../controllers/dto/countBooksDto";
import Book from "../models/book";
import { BookQueryDto } from "../controllers/dto/bookQueryDto";
import { BookDetailsDto } from "../controllers/dto/bookDetailsDto";
import { BookDtoMapper } from "../mapper/bookDtoMapper";
import { fetchOrder } from "../client/httpClient";
import { OrderNotFoundError } from "../../shared/exceptions/orderNotFoundError";

export const addBook = async (bookDto: BookDto): Promise<string> => {
  const { orderId } = bookDto;
  await validateOrder(orderId);
  const book = await BookFactory.createNewBook(bookDto).save();
  return book._id;
};

export const countBooksForOrderIds = async (
  query: OrderIdsDto
): Promise<CountBookDto[]> => {
  const { orderIds } = query;
  const countBooks = await Book.aggregate([
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

  return countBooks.map((countBook) => BookDtoMapper.mapToCountBook(countBook));
};

export const findBooksByOrderId = async (
  query: BookQueryDto
): Promise<BookDetailsDto[]> => {
  const { orderId, size, from } = query;

  const books = await Book.find({ orderId: orderId })
    .sort({ datePublished: -1 })
    .skip(from)
    .limit(size);
  
    const b = await Book.find({ orderId: orderId })
    .sort({ datePublished: -1 })
    .skip(from)
    .limit(size).explain()
  console.log(b)

  return books.map((book) => BookDtoMapper.mapToBookDetails(book));
};

const validateOrder = async (orderId?: number) => {
  const res = await fetchOrder(orderId);
  if (!res.ok) {
    throw new OrderNotFoundError(orderId);
  }
};

