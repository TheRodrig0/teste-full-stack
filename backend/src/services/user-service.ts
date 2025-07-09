import type { BaseCrudInterface } from "../types/crud-interfaces"
import type { User, CreateUser } from "../types/dtos/user-dto"

export class UserService implements BaseCrudInterface<CreateUser, User> {
    constructor(private readonly repository: BaseCrudInterface<CreateUser, User>) {}

    async findAll(): Promise<User[]> {
        return this.repository.findAll()
    }

    async findOne(where: Partial<User>): Promise<User | null> {
        return this.repository.findOne(where)
    }

    async create(data: CreateUser): Promise<User> {
        return this.repository.create(data)
    }
}