import { IBook } from "../models/book";
import { BookDto } from "../controllers/dto/bookDto";
export declare class BookFactory {
    static createNewBook: (book: BookDto) => IBook;
}
