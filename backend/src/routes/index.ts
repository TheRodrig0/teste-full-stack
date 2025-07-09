import type { AppInterface } from "../types/app-interface"
import type { CrudControllerInterface } from "../types/crud-interfaces"
import type { AuthControllerInterface } from "../types/auth-interfaces"
import { taskRoutes } from "./task-routes"
import { googleAuthRoutes } from "./google-auth-routes"

export interface AppControllers {
    task: CrudControllerInterface<unknown, unknown>
    google: AuthControllerInterface
}

const routePath: string = "api/"

export const routes = (controllers: AppControllers) => {
    return async (app: AppInterface) => {
        app.register(taskRoutes(controllers.task), { prefix: routePath })
        app.register(googleAuthRoutes(controllers.google), { prefix: routePath })
    }
}