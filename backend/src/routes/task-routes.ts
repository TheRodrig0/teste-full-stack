import type { AppInterface } from "../types/app-interface"
import type { CrudControllerInterface } from "../types/crud-controller-interface"

const routePath: string = "task/"

export const taskRoutes = (controller: CrudControllerInterface<unknown, unknown>) => {
    return async (app: AppInterface) => {
        app.get(routePath, async (request, reply) => {
            await controller.findAll(request, reply)
        })

        app.get<unknown, { id: string }>(`${routePath}:id`, async (request, reply) => {
            await controller.findById(request, reply)
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