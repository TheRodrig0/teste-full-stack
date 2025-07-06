import { describe, it, expect } from "vitest"
import { BadRequestError } from "./bad-request-error"

describe("Bad request error", (): void => {
    it('should create error with correct properties', (): void => {
        const message = 'Invalid input'
        const error = new BadRequestError(message)

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(BadRequestError)
        expect(error.message).toBe(message)
        expect(error.name).toBe('BadRequestError')
        expect(error.statusCode).toBe(400)
    })
})