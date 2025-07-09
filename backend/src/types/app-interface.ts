import type { RequestInterface, ReplyInterface } from "./common/http-interfaces"

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
    addHook(
        name: string,
        hook: (request: RequestInterface, reply: ReplyInterface) => Promise<void>
    ): void
}