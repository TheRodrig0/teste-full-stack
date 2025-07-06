import type { CrudControllerInterface } from "../types/crud-controller-interface"
import type { CrudServiceInterface } from "../types/crud-service-interface"
import type { ReplyInterface } from "../types/common/reply-interface"
import type { RequestInterface } from "../types/common/request-interface"
import type { Task, CreateTask, UpdateTask } from "../types/task-dtos"

export class TaskController implements CrudControllerInterface<CreateTask, UpdateTask> {
    constructor(private readonly service: CrudServiceInterface<CreateTask, UpdateTask, Task>) { }

    async findAll(request: RequestInterface, reply: ReplyInterface): Promise<void> {
        const tasks = await this.service.findAll()

        reply.status(200)
            .send({ data: tasks })
    }

    async findById(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<void> {
        const { id } = request.params
        const task = await this.service.findById(id)

        reply.status(200)
            .send({ data: task })
    }

    async create(request: RequestInterface<CreateTask>, reply: ReplyInterface): Promise<void> {
        const newTask = await this.service.create(request.body)

        reply.status(201)
            .send({ data: newTask })
    }

    async update(request: RequestInterface<UpdateTask, { id: string }>, reply: ReplyInterface): Promise<void> {
        const { id } = request.params
        const updatedTask = await this.service.update(id, request.body)

        reply.status(200)
            .send({ data: updatedTask })
    }

    async delete(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<void> {
        const { id } = request.params
        await this.service.delete(id)

        reply.status(204)
            .send()
    }
}