import type { BaseCrudInterface } from '../types/crud-interfaces'
import type { User, CreateUser } from '../types/dtos/user-dto'
import { prisma } from './prisma-client'

export class PrismaUserRepository implements BaseCrudInterface<User, CreateUser> {
    async findOne(where: Partial<User>): Promise<User | null> {
        if (!where.email) {
            return null
        }

        const { email } = where
        return prisma.user.findUnique({ where: { email } })
    }

    async create(data: CreateUser): Promise<User> {
        return prisma.user.create({ data })
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany()
    }

}