import { describe, it, expect } from "vitest"
import { NotFoundError } from "./not-found-error"

describe("Not found error", (): void => {
    it('should create error with correct properties', (): void => {
        const message = 'the system did not find'
        const error = new NotFoundError(message)

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(NotFoundError)
        expect(error.message).toBe(message)
        expect(error.name).toBe('NotFoundError')
        expect(error.statusCode).toBe(404)
    })
})