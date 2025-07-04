export interface Task {
    id: string
    title: string
    description?: string
    completed: boolean
    createdAt: string
    updatedAt: string
}

export type newTask = Pick<Task, "title" | "description">