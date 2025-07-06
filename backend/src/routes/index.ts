import type { AppInterface } from "../types/app-interface"
import type { CrudControllerInterface } from "../types/crud-controller-interface"
import { taskRoutes } from "./task-routes"

const routePath: string = "api/"

export const routes = (controllers: Record<string, CrudControllerInterface<unknown, unknown>>) => {
    return async (app: AppInterface) => {
        app.register(taskRoutes(controllers.task), { prefix: routePath })
    }
}