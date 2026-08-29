export class AppError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message)
        this.name = new.target.name
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404)
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Invalid request") {
        super(message, 400)
    }
}
