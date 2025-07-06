import type { ReplyInterface } from "../../src/types/common/reply-interface"
import type { RequestInterface } from "./common/request-interface"

export interface CrudControllerInterface<CreateDTO, UpdateDTO> {
    findAll(request: RequestInterface, reply: ReplyInterface): Promise<void>
    findById(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<void>
    create(request: RequestInterface<CreateDTO>, reply: ReplyInterface): Promise<void>
    update(request: RequestInterface<UpdateDTO, { id: string }>, reply: ReplyInterface): Promise<void>
    delete(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<void>
}