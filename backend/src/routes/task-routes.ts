import type { AppInterface } from "../types/app-interface"
import type { CrudControllerInterface } from "../types/crud-interfaces"
import { authMiddleware } from "../middlewares/auth-middleware"

const routePath: string = "task/"

export const taskRoutes = (controller: CrudControllerInterface<unknown, unknown>) => {
    return async (app: AppInterface) => {
        app.addHook('preHandler', authMiddleware)

        app.get(routePath, async (request, reply) => {
            await controller.findAll(request, reply)
        })

        app.get<unknown, { id: string }>(`${routePath}:id`, async (request, reply) => {
            await controller.findOne(request, reply)
        })

        app.post(routePath, async (request, reply) => {
            await controller.create(request, reply)
        })

        app.patch<unknown, { id: string }>(`${routePath}:id`, async (request, reply) => {
            await controller.update(request, reply)
        })

        app.delete<unknown, { id: string }>(`${routePath}:id`, async (request, reply) => {
            await controller.delete(request, reply)
        })
    }
}