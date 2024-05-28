import { NextFunction, Request, Response } from "express";
import { BookDto } from "./dto/bookDto";
import {
  ArrayNotEmpty,
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidationError,
  validationPipe,
} from "../../shared/validators/catalogValidator";
import {
  addBook,
  findBooksByOrderId,
  countBooksForOrderIds,
} from "../services/bookService";
import httpStatus from "http-status";
import { BookQueryDto } from "./dto/bookQueryDto";
import { OrderIdsDto } from "./dto/orderIdsDto";
import { BookValidationError } from "../../shared/exceptions/bookValidationError";
import log4js from "log4js";

const countBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate(await validationPipe(OrderIdsRequest, req.body));

    const countBooks = new OrderIdsDto(req.body);
    const books = await countBooksForOrderIds(countBooks);
    return res.status(httpStatus.OK).send(books);
  } catch (err) {
    log4js.getLogger().error("Error in count books.", err);
    return next(err);
  }
};

const findBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate(await validationPipe(BookQueryRequest, req.query));

    const bookQuery = new BookQueryDto(req.query);
    const books = await findBooksByOrderId({
      ...bookQuery,
    });

    return res.status(httpStatus.OK).send(books);
  } catch (err) {
    log4js.getLogger().error("Error in searching books.", err);
    return next(err);
  }
};

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate(await validationPipe(BookRequest, req.body));

    const book = new BookDto(req.body);
    const id = await addBook({
      ...book,
    });
    return res.status(httpStatus.CREATED).send({ id });
  } catch (err) {
    log4js.getLogger().error("Error in creating book.", err);
    return next(err);
  }
};

const validate = (errors: ValidationError[]) => {
  if (errors.length > 0) {
    throw new BookValidationError(formatError(errors));
  }
};

const formatError = (validationErrors: ValidationError[]): string => {
  let errors: string[] = [];

  for (let error of validationErrors) {
    if (error.constraints !== undefined) {
      errors.push(JSON.stringify(error.constraints));
    }
  }

  return errors.join(", ");
};

class BookRequest {
  @IsNotEmpty()
  @IsString()
  title?: string;
  @IsNotEmpty()
  @IsString()
  description?: string;
  @IsNumber()
  @Min(0)
  price?: number;
  @IsNumber()
  @Min(1)
  orderId?: number;
  @IsNumber()
  @Min(0)
  available?: number;
  @IsISO8601()
  datePublished?: Date;
}

class BookQueryRequest {
  @IsNotEmpty()
  orderId?: number;
  @IsOptional()
  size?: number;
  @IsOptional()
  from?: number;
}

class OrderIdsRequest {
  @ArrayNotEmpty()
  @IsArray()
  orderIds?: [];
}

export { countBooks, findBooks, createBook };
