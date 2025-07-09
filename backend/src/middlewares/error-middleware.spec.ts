import { describe, it, expect, vi } from "vitest"
import { errorMiddleware } from "./error-middleware"

describe("errorMiddleware", (): void => {
    it("should create error with correct properties", (): void => {
        const message = "Test message"
        const error = (new Error(message) as Error & { statusCode: number })
        error.statusCode = 400

        const mockRequest = {
            body: {},
            params: {},
            query: {},
            headers: {},
            user: {}
        }

        const mockReply = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
            redirect: vi.fn().mockReturnThis()
        }

        errorMiddleware(error, mockRequest, mockReply)

        expect(mockReply.status).toHaveBeenCalledWith(400)
        expect(mockReply.send).toHaveBeenCalledWith({
            error: error.name,
            message: message
        })
    })

    it("should use default status code 500 when statusCode is not provided", (): void => {
        const message = "Internal server error"
        const error = new Error(message)

        const mockRequest = {
            body: {},
            params: {},
            query: {},
            headers: {},
            user: {}
        }

        const mockReply = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
            redirect: vi.fn().mockReturnThis()
        }

        errorMiddleware(error as Error & { statusCode: number }, mockRequest, mockReply)

        expect(mockReply.status).toHaveBeenCalledWith(500)
        expect(mockReply.send).toHaveBeenCalledWith({
            error: error.name,
            message: message
        })
    })
})
