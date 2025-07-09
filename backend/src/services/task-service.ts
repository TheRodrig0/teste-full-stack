import type { CrudServiceInterface, CrudRepositoryInterface } from "../types/crud-interfaces"
import type { Task, CreateTask, UpdateTask } from "../types/dtos/task-dtos"
import { NotFoundError } from "../utils/error/not-found-error"
import { BadRequestError } from "../utils/error/bad-request-error"
import { InternalServerError } from "../utils/error/internal-server-error"

export class TaskService implements CrudServiceInterface<CreateTask, UpdateTask, Task> {
    constructor(private readonly repository: CrudRepositoryInterface<CreateTask, UpdateTask, Task>) { }

    async findAll(where: Partial<Task>): Promise<Task[]> {
        const result = await this.repository.findAll(where)
        return result
    }

    async findOne(where: Partial<Task>): Promise<Task | null> {
        if (!where.id || !where.userId) {
            throw new BadRequestError("Task ID and User ID must be provided for findOne")
        }
        
        const result = await this.repository.findOne(where)

        if (!result) {
            throw new NotFoundError("Task not found or permission denied")
        }

        return result
    }

    async create(data: CreateTask): Promise<Task> {
        if (!data.title || data.title.trim() === "") {
            throw new BadRequestError("Title is a required field")
        }
        
        if (!data.userId) {
            throw new BadRequestError("User ID is required to create a task")
        }

        const result = await this.repository.create(data)

        if (!result) {
            throw new InternalServerError("An unexpected error occurred while creating the task")
        }

        return result
    }

    async update(where: Partial<Task>, data: UpdateTask): Promise<Task | null> {
        if (!where.id || !where.userId) {
            throw new BadRequestError("Task ID and User ID must be provided for update")
        }

        const result = await this.repository.update(where, data)

        if (!result) {
            throw new NotFoundError("Task not found or permission denied to update")
        }

        return result
    }

    async delete(where: Partial<Task>): Promise<void> {
        if (!where.id || !where.userId) {
            throw new BadRequestError("Task ID and User ID must be provided for delete")
        }
        
        const result = await this.repository.delete(where)

        if (!result) {
            throw new NotFoundError("Task not found or permission denied to delete")
        }
    }
}
