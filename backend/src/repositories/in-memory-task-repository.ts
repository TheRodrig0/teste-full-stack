import type { CrudRepositoryInterface } from "../types/crud-repository-interface"
import type { CreateTask, UpdateTask, Task } from "../types/task-dtos"

export class InMemoryTaskRepository implements CrudRepositoryInterface<CreateTask, UpdateTask, Task> {
    private tasks: Map<string, Task> = new Map()

    async findAll(): Promise<Task[]> {
        return [...this.tasks.values()]
    }

    async findById(id: string): Promise<Task | null> {
        return this.tasks.get(id) || null
    }

    async create(data: CreateTask): Promise<Task> {
        const id = crypto.randomUUID()
        const completed = false

        const newTask: Task = {
            id,
            completed,
            ...data
        }

        this.tasks.set(id, newTask)

        return newTask
    }

    async update(id: string, data: UpdateTask): Promise<Task | null> {
        const task = this.tasks.get(id)

        if (!task) {
            return null
        }

        const updatedTask: Task = {
            ...task,
            ...data,
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