import type { ReplyInterface } from "./common/reply-interface"
import type { RequestInterface } from "./common/request-interface"

type HttpRequestType = <Body, Param>(
    path: string,
    handler: (request: RequestInterface<Body, Param>, reply: ReplyInterface) => void
) => void

export interface AppInterface {
    listen(opts: { port: number }): Promise<string>
    register(plugin: unknown, opts?: Record<string, unknown>): Promise<void>
    printRoutes(): string
    setErrorHandler(handler: (error: Error & { statusCode: number }, request: RequestInterface, reply: ReplyInterface) => void): void
    get: HttpRequestType
    post: HttpRequestType
    patch: HttpRequestType
    delete: HttpRequestType
}