import { describe, it, expect } from "vitest"
import { UnauthorizedError } from "./unauthorized-error"

describe("Unauthorized error", (): void => {
    it('should create error with correct properties', (): void => {
        const message = 'you are not allowed'
        const error = new UnauthorizedError(message)

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(UnauthorizedError)
        expect(error.message).toBe(message)
        expect(error.name).toBe('UnauthorizedError')
        expect(error.statusCode).toBe(401)
    })
})