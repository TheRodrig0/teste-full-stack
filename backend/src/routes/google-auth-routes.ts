import type { AppInterface } from "../types/app-interface"
import type { AuthControllerInterface } from "../types/auth-interfaces"

const routePath = "auth/google/"
export const googleAuthRoutes = (controller: AuthControllerInterface) => {
    return async (app: AppInterface) => {
        app.get(`${routePath}url`, async (request, reply) => {
            await controller.getAuthUrl(request, reply)
        })

        app.get(`${routePath}callback`, async (request, reply) => {
            await controller.handleCallback(request, reply)
        })
    }
}