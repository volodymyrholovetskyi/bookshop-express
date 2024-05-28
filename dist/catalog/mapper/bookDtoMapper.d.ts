import { CountBookDto } from "../controllers/dto/countBooksDto";
import { BookDetailsDto } from "../controllers/dto/bookDetailsDto";
import { IBook } from "../models/book";
export declare class BookDtoMapper {
    static mapToBookDetails: (book: IBook) => BookDetailsDto;
    static mapToCountBook: (countBooks: any) => CountBookDto;
}
