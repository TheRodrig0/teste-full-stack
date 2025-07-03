import type { AppInterface } from "../types/app-interface"
import type { CrudControllerInterface } from "../types/crud-controller-interface"

const routePath: string = "api/task"

export const registerTaskRoutes = (app: AppInterface, controller: CrudControllerInterface<unknown>) => {
    app.register((app: AppInterface) => {
        app.get(`/`, async (request, reply) => {
            return await controller
                .findAll(request, reply)
        })

        app.get(`/:id`, async (request, reply) => {
            return await controller
                .findById(request, reply)
        })

        app.post(`/`, async (request, reply) => {
            return await controller
                .create(request, reply)
        })

        app.patch(`/:id`, async (request, reply) => {
            return await controller
                .update(request, reply)
        })

        app.delete(`/:id`, async (request, reply) => {
            return await controller
                .delete(request, reply)
        })
    }, { prefix: routePath })
}