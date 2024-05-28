export class BookDto {
  title?: string;
  description?: string;
  price?: number;
  orderId?: number;
  available?: number;
  datePublished?: Date;

  constructor(data: Partial<BookDto>) {
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.orderId = data.orderId;
    this.available = data.available;
    this.datePublished = data.datePublished;
  }
}
