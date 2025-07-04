export class NotFoundError extends Error {
    public readonly statusCode = 404
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }
}