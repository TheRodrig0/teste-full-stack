import { AppInterface } from "./types/app-interface"
import fastify from "fastify"
import { TaskController } from "./controllers/task-controller"
import { TaskService } from "./services/task-service"
import { InMemoryTaskRepository } from "./repositories/in-memory-task-repository"
import { registerTaskRoutes } from "./routes/task-routes"

const app = fastify({ logger: true }) as unknown as AppInterface

const taskRepository = new InMemoryTaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

const buildApp = async () => {
    registerTaskRoutes(app, taskController)
    await app.ready()
    app.listen({ port: 3000 })
    console.log(app.printRoutes())
}

buildApp()