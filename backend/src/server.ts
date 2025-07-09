import type { AppInterface } from "./types/app-interface"
import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import fastifyRateLimit from "@fastify/rate-limit"
import { configDotenv } from "dotenv"
import { errorMiddleware } from "./middlewares/error-middleware"
import { TaskController } from "./controllers/task-controller"
import { TaskService } from "./services/task-service"
import { PrismaTaskRepository } from "./repositories/prisma-task-repository"
import { PrismaUserRepository } from "./repositories/prisma-user-repository"
import { UserService } from "./services/user-service"
import { GoogleAuthController } from "./controllers/google-auth-controller"
import { GoogleAuthService } from "./services/google-auth-service"
import { routes } from "./routes"

configDotenv()

const app = fastify({ logger: true }) as unknown as AppInterface
const taskRepository = new PrismaTaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

const userRepository = new PrismaUserRepository()
const userService = new UserService(userRepository)

const googleAuthService = new GoogleAuthService(userService)
const googleController = new GoogleAuthController(googleAuthService)

const controllers = {
    task: taskController,
    google: googleController
} as const

const buildApp = async (): Promise<void> => {
    await app.register(fastifyCors, {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'] 
    })

    await app.register(fastifyRateLimit, {
        max: 20,
        timeWindow: '1 minute'
    })

    app.setErrorHandler(errorMiddleware)

    await app.register(routes(controllers))

    app.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' })
}

buildApp()