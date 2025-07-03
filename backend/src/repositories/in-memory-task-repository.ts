import type { CrudRepositoryInterface } from "../types/crud-repository-interface"
import type {
    CreateTaskDTO,
    UpdateTaskDTO,
    ReplyTaskDTO
} from "../types/task-dtos"

export class InMemoryTaskRepository implements CrudRepositoryInterface<CreateTaskDTO, UpdateTaskDTO, ReplyTaskDTO> {
    private tasks: Map<string, ReplyTaskDTO> = new Map()

    async findAll(): Promise<ReplyTaskDTO[]> {
        return [...this.tasks.values()]
    }

    async findById(id: string): Promise<ReplyTaskDTO | null> {
        return this.tasks.get(id) || null
    }

    async create(data: CreateTaskDTO): Promise<ReplyTaskDTO> {
        const id = crypto.randomUUID()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const completed = false

        const newTask: ReplyTaskDTO = {
            id,
            createdAt,
            updatedAt,
            completed,
            ...data
        }

        this.tasks.set(id, newTask)

        return newTask
    }

    async update(id: string, data: UpdateTaskDTO): Promise<ReplyTaskDTO | null> {
        const task = this.tasks.get(id)

        if (!task) {
            return null
        }

        const updatedAt = new Date().toISOString()

        const updatedTask: ReplyTaskDTO = {
            ...task,
            ...data,
            updatedAt
        }

        this.tasks.set(id, updatedTask)

        return updatedTask
    }

    async delete(id: string): Promise<boolean> {
        if (!this.tasks.get(id)) {
            return false
        }

        this.tasks.delete(id)

        return true
    }
}