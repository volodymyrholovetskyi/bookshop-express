import { CountBookDto } from "../controllers/dto/countBooksDto";
import { BookDetailsDto } from "../controllers/dto/bookDetailsDto";
import { IBook } from "../models/book";

export class BookDtoMapper {
  static mapToBookDetails = (book: IBook): BookDetailsDto => {
    return {
      id: book.id,
      orderId: book.orderId,
      price: book.price,
      available: book.available,
      datePublished: book.datePublished,
    };
  };

  static mapToCountBook = (countBooks: any): CountBookDto => {
    return {
      orderId: countBooks._id,
      totalBooks: countBooks.totalBooks,
    };
  };
}
