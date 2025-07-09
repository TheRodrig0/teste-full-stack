import type { CrudRepositoryInterface } from "../types/crud-interfaces"
import type { CreateTask, UpdateTask, Task } from "../types/dtos/task-dtos"
import { prisma } from "./prisma-client"

export class PrismaTaskRepository implements CrudRepositoryInterface<CreateTask, UpdateTask, Task> {
    async findAll(where: Partial<Task>): Promise<Task[]> {
        if (!where.userId) {
            return []
        }

        const tasksFromDb = await prisma.task.findMany({
            where: { userId: where.userId }
        })
        
        return tasksFromDb.map(task => ({
            ...task,
            description: task.description ?? undefined,
        }))
    }

    async findOne(where: Partial<Task>): Promise<Task | null> {
        if (!where.id || !where.userId) {
            return null
        }

        const taskFromDb = await prisma.task.findFirst({
            where: {
                id: where.id,
                userId: where.userId
            }
        })

        if (!taskFromDb) {
            return null
        }

        return {
            ...taskFromDb,
            description: taskFromDb.description ?? undefined,
        }
    }

    async create(data: CreateTask): Promise<Task> {
        const newTaskFromDb = await prisma.task.create({
            data,
        })

        return {
            ...newTaskFromDb,
            description: newTaskFromDb.description ?? undefined,
        }
    }

    async update(where: Partial<Task>, data: UpdateTask): Promise<Task | null> {
        if (!where.id || !where.userId) {
            return null
        }

        const taskExists = await prisma.task.findFirst({
            where: {
                id: where.id,
                userId: where.userId,
            },
        })

        if (!taskExists) {
            return null
        }

        const updatedTaskFromDb = await prisma.task.update({
            where: {
                id: where.id,
            },
            data
        })

        return {
            ...updatedTaskFromDb,
            description: updatedTaskFromDb.description ?? undefined
        }
    }
    
    async delete(where: Partial<Task>): Promise<boolean> {
        if (!where.id || !where.userId) {
            return false
        }

        const taskExists = await prisma.task.findFirst({
            where: {
                id: where.id,
                userId: where.userId,
            },
        })

        if (!taskExists) {
            return false
        }

        await prisma.task.delete({
            where: {
                id: where.id,
            }
        })

        return true
    }
}
