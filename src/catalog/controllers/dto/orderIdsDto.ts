export class OrderIdsDto {
    orderIds?: number[];
  
    constructor(data: Partial<OrderIdsDto>) {
      this.orderIds = data.orderIds;
    }
  }