import type { ReplyInterface } from "../types/common/reply-interface"
import type { RequestInterface } from "../types/common/request-interface"

export const errorMiddleware = (error: Error & { statusCode: number }, request: RequestInterface, reply: ReplyInterface) => {
    const statusCode = error.statusCode || 500

    return reply.status(statusCode).send({
        error: error.name || 'InternalServerError',
        message: error.message
    })
}