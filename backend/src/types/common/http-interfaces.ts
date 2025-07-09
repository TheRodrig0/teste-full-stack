export interface RequestInterface<Body = unknown, Params = unknown, Query = unknown, Headers = unknown, User = unknown> {
    body: Body
    params: Params
    query: Query
    headers: Headers
    user: User
}

export interface ReplyInterface {
    status(statusCode: number): ReplyInterface
    send(payload?: unknown): ReplyInterface
    redirect(path: string): void
}