export class HttpClientTimeoutError extends Error {
    constructor(message: string) {
        super(message)
    }
}