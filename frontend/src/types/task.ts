export interface Task {
    id: string
    title: string
    description?: string
    completed: boolean
    createdAt: string
    updatedAt: string
}

export type NewTask = Pick<Task, "title" | "description">