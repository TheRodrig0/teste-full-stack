import type { CrudRepositoryInterface } from "../types/crud-interfaces"
import type { CreateTask, UpdateTask, Task } from "../types/dtos/task-dtos"

export class InMemoryTaskRepository implements CrudRepositoryInterface<CreateTask, UpdateTask, Task> {
    private tasks: Task[] = []

    async findAll(where: Partial<Task>): Promise<Task[]> {
        if (!where?.userId) {
            return []
        }
        
        return this.tasks.filter(task => task.userId === where.userId)
    }

    async findOne(where: Partial<Task>): Promise<Task | null> {
        if(!where.id || !where.userId) {
            return null
        }

        const task = this.tasks.find(t => t.id === where.id && t.userId === where.userId)
        return task || null
    }

    async create(data: CreateTask): Promise<Task> {
        const id = crypto.randomUUID()
        const completed = false

        const newTask: Task = {
            id,
            completed,
            description: data.description ?? undefined,
            ...data
        }

        this.tasks.push(newTask)

        return newTask
    }

    async update(where: Partial<Task>, data: UpdateTask): Promise<Task | null> {
        if (!where.id || !where.userId) {
            return null
        }

        const taskIndex = this.tasks.findIndex(t => t.id === where.id && t.userId === where.userId)

        if (taskIndex === -1) {
            return null
        }

        const originalTask = this.tasks[taskIndex]

        const updatedTask: Task = {
            ...originalTask,
            ...data,
        }

        this.tasks[taskIndex] = updatedTask

        return updatedTask
    }

    async delete(where: Partial<Task>): Promise<boolean> {
        if (!where.id || !where.userId) {
            return false
        }

        const initialLength = this.tasks.length
        this.tasks = this.tasks.filter(t => !(t.id === where.id && t.userId === where.userId))
        
        return this.tasks.length < initialLength
    }
}
