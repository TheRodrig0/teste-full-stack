export interface CrudRepositoryInterface<CreateDTO, UpdateDTO, ReplyDTO> {
    findAll(): Promise<ReplyDTO[]>
    findById(id: string): Promise<ReplyDTO | null>
    create(data: CreateDTO): Promise<ReplyDTO>
    update(id: string, data: UpdateDTO): Promise<ReplyDTO | null>
    delete(id: string): Promise<boolean>
}