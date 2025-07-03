import type { CrudRepositoryInterface } from "../types/crud-repository-interface"
import type { CrudServiceInterface } from "../types/crud-service-interface"
import type {
    CreateTaskDTO,
    UpdateTaskDTO,
    ReplyTaskDTO
} from "../types/task-dtos"

export class TaskService implements CrudServiceInterface<CreateTaskDTO, UpdateTaskDTO, ReplyTaskDTO> {
    constructor(private readonly repository: CrudRepositoryInterface<CreateTaskDTO, UpdateTaskDTO, ReplyTaskDTO>) { }

    async findAll(): Promise<ReplyTaskDTO[]> {
        const result = await this.repository.findAll()

        return result
    }

    async findById(id: string): Promise<ReplyTaskDTO | null> {
        const result = await this.repository.findById(id)

        if (!result) {
            throw new Error("Error to find the task")
        }

        return result
    }

    async create(data: CreateTaskDTO): Promise<ReplyTaskDTO> {
        const result = await this.repository.create(data)

        if (!result) {
            throw new Error("Error to create the task")
        }

        return result
    }

    async update(id: string, data: UpdateTaskDTO): Promise<ReplyTaskDTO | null> {
        const result = await this.repository.update(id, data)

        if (!result) {
            throw new Error("Error to update the task")
        }

        return result
    }

    async delete(id: string): Promise<void> {
        const result = await this.repository.delete(id)

        if (!result) {
            throw new Error("Error to delete the task")
        }
    }

}