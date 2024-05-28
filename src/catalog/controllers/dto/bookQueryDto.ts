export class BookQueryDto {
  orderId?: number;
  from: number;
  size: number;

  constructor(query: Partial<BookQueryDto>) {
    this.orderId = query.orderId;
    this.from = query.from || 0;
    this.size = query.size || 10;
  }
}
