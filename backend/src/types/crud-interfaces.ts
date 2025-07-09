import type { RequestInterface, ReplyInterface } from "./common/http-interfaces"

export interface BaseCrudInterface<CreateDTO, ReplyDTO> {
    findAll(where?: Partial<ReplyDTO>): Promise<ReplyDTO[]>
    findOne(where: Partial<ReplyDTO>): Promise<ReplyDTO | null>
    create(data: CreateDTO): Promise<ReplyDTO>
}

export interface BaseCrudControllerInterface<CreateDTO, ReplyDTO> {
    findAll(request: RequestInterface, reply: ReplyInterface): Promise<void>
    findOne(request: RequestInterface<unknown, Partial<Record<string, unknown>>>, reply: ReplyInterface): Promise<void>
    create(request: RequestInterface<CreateDTO>, reply: ReplyInterface): Promise<void>
}

export interface CrudControllerInterface<CreateDTO, UpdateDTO> extends BaseCrudControllerInterface<CreateDTO, unknown> {
    update(request: RequestInterface<UpdateDTO, { id: string }>, reply: ReplyInterface): Promise<void>
    delete(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<void>
}

export interface CrudServiceInterface<CreateDTO, UpdateDTO, ReplyDTO> extends BaseCrudInterface<CreateDTO, ReplyDTO> {
    update(where: Partial<ReplyDTO>, data: UpdateDTO): Promise<ReplyDTO | null>
    delete(where: Partial<ReplyDTO>): Promise<void>
}

export interface CrudRepositoryInterface<CreateDTO, UpdateDTO, ReplyDTO> extends BaseCrudInterface<CreateDTO, ReplyDTO> {
    update(where: Partial<ReplyDTO>, data: UpdateDTO): Promise<ReplyDTO | null>
    delete(where: Partial<ReplyDTO>): Promise<boolean>
}