import { RequestInterface } from "./request-interface"
import { ReplyInterface } from "./reply-interface"

export type HttpRequestType = <Body = unknown>(
    path: string,
    handler: (request: RequestInterface<Body>, reply: ReplyInterface) => void
) => void