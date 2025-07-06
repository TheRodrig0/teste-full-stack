import type { AppInterface } from "./types/app-interface"
import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import fastifyRateLimit from "@fastify/rate-limit"
import { configDotenv } from "dotenv"
import { errorMiddleware } from "./middlewares/error-middleware"
import { TaskController } from "./controllers/task-controller"
import { TaskService } from "./services/task-service"
import { InMemoryTaskRepository } from "./repositories/in-memory-task-repository"
import { routes } from "./routes"

configDotenv()

const app = fastify({ logger: true }) as unknown as AppInterface

const taskRepository = new InMemoryTaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

const controllers = {
    task: taskController
} as const

const buildApp = async (): Promise<void> => {
    await app.register(fastifyCors, {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })

    await app.register(fastifyRateLimit, {
        max: 100,
        timeWindow: '1 minute'
    })

    app.setErrorHandler(errorMiddleware)

    await app.register(routes(controllers))

    app.listen({ port: Number(process.env.PORT) })
    console.log(app.printRoutes())
}

buildApp()