import z from "zod"

export const CreateTaskSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().max(100).optional()
})

export const UpdateTaskSchema = z.object({
    title: z.string().min(1).max(50).optional(),
    description: z.string().max(100).optional(),
    completed: z.boolean().optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field must be provided for update." }
)