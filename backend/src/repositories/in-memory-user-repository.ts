import type { BaseCrudInterface } from "../types/crud-interfaces"
import type { User, CreateUser } from "../types/dtos/user-dto"

export class InMemoryUserRepository implements BaseCrudInterface<CreateUser, User> {
    private users: User[] = []

    async findAll(): Promise<User[]> {
        return this.users
    }

    async findOne(where: Partial<User>): Promise<User | null> {
        return this.users.find(user => {
            return Object.entries(where).every(([key, value]) => (user as any)[key] === value)
        }) || null
    }

    async create(data: CreateUser): Promise<User> {
        const user: User = {
            id: crypto.randomUUID(),
            ...data
        }
        this.users.push(user)
        return user
    }
}