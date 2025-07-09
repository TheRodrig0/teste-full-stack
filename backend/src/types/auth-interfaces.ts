import type { RequestInterface, ReplyInterface } from "./common/http-interfaces"

export interface AuthControllerInterface {
    getAuthUrl(request: RequestInterface, reply: ReplyInterface): Promise<void>
    handleCallback(request: RequestInterface, reply: ReplyInterface): Promise<void>
}

export interface AuthServiceInterface<T> {
    getAuthUrl(): { url: string }
    handleCallback(code: string): Promise<T>
}
