import Book, { IBook } from "../models/book";
import { BookDto } from "../controllers/dto/bookDto";

export class BookFactory {
  static createNewBook = (book: BookDto): IBook => {
    return new Book({
      ...book,
    });
  };
}
