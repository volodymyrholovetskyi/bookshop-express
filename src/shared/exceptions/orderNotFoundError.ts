
export class OrderNotFoundError extends Error {
    constructor(orderId?: number) {
        super(`Order with ID: [ ${orderId} ] not found!`)
    }
}