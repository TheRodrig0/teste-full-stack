export interface User {
    id: string
    email: string
    name: string
}

export type CreateUser = Omit<User, "id">