import { describe, it, expect } from "vitest"
import { InternalServerError } from "./internal-server-error"

describe("Internal server error", (): void => {
    it('should create error with correct properties', (): void => {
        const message = 'Server error'
        const error = new InternalServerError(message)

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(InternalServerError)
        expect(error.message).toBe(message)
        expect(error.name).toBe('InternalServerError')
        expect(error.statusCode).toBe(500)
    })
})