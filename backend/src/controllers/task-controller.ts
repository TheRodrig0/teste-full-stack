import type { CrudControllerInterface, CrudServiceInterface } from "../types/crud-interfaces"
import type { ReplyInterface, RequestInterface } from "../types/common/http-interfaces"
import type { Task, CreateTask, UpdateTask } from "../types/dtos/task-dtos"
import type { User } from "../types/dtos/user-dto"

export class TaskController implements CrudControllerInterface<CreateTask, UpdateTask> {
    constructor(private readonly service: CrudServiceInterface<CreateTask, UpdateTask, Task>) { }

    async findAll(request: RequestInterface, reply: ReplyInterface): Promise<void> {
        const user = request.user as User
        const tasks = await this.service.findAll({ userId: user.id })

        reply.status(200)
            .send(tasks)
    }

    async findOne(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<void> {
        const user = request.user as User
        const { id } = request.params
        const task = await this.service.findOne({ id, userId: user.id })

        reply.status(200)
            .send(task)
    }

    async create(request: RequestInterface<CreateTask>, reply: ReplyInterface): Promise<void> {
        const user = request.user as User
        const newTask = await this.service.create({
            ...request.body,
            userId: user.id
        })

        reply.status(201)
            .send(newTask)
    }

    async update(request: RequestInterface<UpdateTask, { id: string }>, reply: ReplyInterface): Promise<void> {
        const user = request.user as User
        const { id } = request.params
        const updatedTask = await this.service.update({ id, userId: user.id }, request.body)

        reply.status(200)
            .send(updatedTask)
    }

    async delete(request: RequestInterface<unknown, { id: string }>, reply: ReplyInterface): Promise<void> {
        const user = request.user as User
        const { id } = request.params
        await this.service.delete({ id, userId: user.id })

        reply.status(204)
            .send()
    }
}
