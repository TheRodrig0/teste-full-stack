import type { RequestInterface, ReplyInterface } from "../types/common/http-interfaces"

export const errorMiddleware = (error: Error & { statusCode: number }, request: RequestInterface, reply: ReplyInterface) => {
    const statusCode = error.statusCode || 500

    if(statusCode == 500){
        console.log(error)
    }
    return reply.status(statusCode).send({
        error: error.name || 'InternalServerError',
        message: error.message
    })

}