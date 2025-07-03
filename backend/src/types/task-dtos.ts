export interface CreateTaskDTO {
    title: string
    description?: string
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {
    completed?: boolean
}

export interface ReplyTaskDTO {
    id: string
    title: string
    description?: string
    completed: boolean
    createdAt: string
    updatedAt: string
}