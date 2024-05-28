import { BookDto } from "../controllers/dto/bookDto";
import { OrderIdsDto } from "../controllers/dto/orderIdsDto";
import { CountBookDto } from "../controllers/dto/countBooksDto";
import { BookQueryDto } from "../controllers/dto/bookQueryDto";
import { BookDetailsDto } from "../controllers/dto/bookDetailsDto";
export declare const addBook: (bookDto: BookDto) => Promise<string>;
export declare const countBooksForOrderIds: (query: OrderIdsDto) => Promise<CountBookDto[]>;
export declare const findBooksByOrderId: (query: BookQueryDto) => Promise<BookDetailsDto[]>;
