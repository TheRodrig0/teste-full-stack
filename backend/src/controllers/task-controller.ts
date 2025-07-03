import type { ReplyInterface } from "../types/common/reply-interface"
import type { RequestInterface } from "../types/common/request-interface"
import type { CrudControllerInterface } from "../types/crud-controller-interface"
import type { CrudServiceInterface } from "../types/crud-service-interface"
import type {
    CreateTaskDTO,
    UpdateTaskDTO,
    ReplyTaskDTO
} from "../types/task-dtos"
import { handleAsync } from "../utils/handle-async"

export class TaskController implements CrudControllerInterface<CreateTaskDTO> {
    constructor(private readonly service: CrudServiceInterface<CreateTaskDTO, UpdateTaskDTO, ReplyTaskDTO>) { }

    async findAll(_request: RequestInterface, reply: ReplyInterface): Promise<ReplyInterface> {
        const [error, data] = await handleAsync(this.service.findAll())

        if (error) {
            return reply.code(400)
                .send({
                    message: (error as Error).message
                })
        }

        return reply.code(200)
            .send({
                data
            })
    }

    async findById(request: RequestInterface, reply: ReplyInterface): Promise<ReplyInterface> {
        const { id } = request.params
        const [error, data] = await handleAsync(this.service.findById(id))

        if (error) {
            return reply.code(400)
                .send({
                    message: (error as Error).message
                })
        }

        return reply.code(200)
            .send({
                data
            })
    }

    async create(request: RequestInterface<CreateTaskDTO>, reply: ReplyInterface): Promise<ReplyInterface> {
        const [error, data] = await handleAsync(this.service.create(request.body))

        if (error) {
            return reply.code(400)
                .send({
                    message: (error as Error).message
                })
        }

        return reply.code(201)
            .send({
                data
            })
    }

    async update(request: RequestInterface<UpdateTaskDTO>, reply: ReplyInterface): Promise<ReplyInterface> {
        const { id } = request.params
        const [error, data] = await handleAsync(this.service.update(id, request.body))

        if (error) {
            return reply.code(400)
                .send({ message: (error as Error).message })
        }

        return reply.code(200)
            .send({
                data
            })
    }

    async delete(request: RequestInterface, reply: ReplyInterface): Promise<ReplyInterface> {
        const { id } = request.params
        const [error] = await handleAsync(this.service.delete(id))

        if (error) {
            return reply.code(400)
                .send({ message: (error as Error).message })
        }

        return reply.code(204)
            .send()
    }
}