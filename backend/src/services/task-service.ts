import type { CrudServiceInterface } from "../types/crud-service-interface"
import type { CrudRepositoryInterface } from "../types/crud-repository-interface"
import type { Task, CreateTask, UpdateTask } from "../types/task-dtos"
import { NotFoundError } from "../utils/error/not-found-error"
import { BadRequestError } from "../utils/error/bad-request-error"
import { InternalServerError } from "../utils/error/internal-server-error"

export class TaskService implements CrudServiceInterface<CreateTask, UpdateTask, Task> {
    constructor(private readonly repository: CrudRepositoryInterface<CreateTask, UpdateTask, Task>) { }

    async findAll(): Promise<Task[]> {
        const result = await this.repository.findAll()

        return result
    }

    async findById(id: string): Promise<Task | null> {
        const result = await this.repository.findById(id)

        if (!result) {
            throw new NotFoundError("Task not found")
        }

        return result
    }

    async create(data: CreateTask): Promise<Task> {
        if (!data.title || data.title.trim() === "") {
            throw new BadRequestError("Title is a required field")
        }

        const result = await this.repository.create(data)

        if (!result) {
            throw new InternalServerError("An unexpected error occurred while creating the task")
        }

        return result
    }

    async update(id: string, data: UpdateTask): Promise<Task | null> {
        const result = await this.repository.update(id, data)

        if (!result) {
            throw new NotFoundError("Task not found to update")
        }

        return result
    }

    async delete(id: string): Promise<void> {
        const result = await this.repository.delete(id)

        if (!result) {
            throw new NotFoundError("Task not found to delete")
        }
    }
}