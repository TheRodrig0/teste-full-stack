export interface Task {
    id: string
    title: string
    description?: string
    completed: boolean
}

export type CreateTask = Omit<Task, 'id' | 'completed'>
export type UpdateTask = Partial<Omit<Task, 'id'>>