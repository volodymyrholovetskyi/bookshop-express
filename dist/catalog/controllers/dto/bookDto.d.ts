export declare class BookDto {
    title?: string;
    description?: string;
    price?: number;
    orderId?: number;
    available?: number;
    datePublished?: Date;
    constructor(data: Partial<BookDto>);
}
