export interface RequestInterface<Body = unknown, Params = unknown> {
    body: Body
    params: Params
    query?: Record<string, string | string[]>
    headers?: Record<string, string>
}