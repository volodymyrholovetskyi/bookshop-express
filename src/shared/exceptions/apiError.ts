export class ApiError {
    statusCode?: number;
    status?: string;
    message?: string;

    constructor(status: string, statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
}