import type { AuthControllerInterface, AuthServiceInterface } from "../types/auth-interfaces"
import type { RequestInterface, ReplyInterface } from "../types/common/http-interfaces"
import type { User } from "../types/dtos/user-dto"
import jwt from "jsonwebtoken"

interface GoogleCodeString {
    code: string
}

export class GoogleAuthController implements AuthControllerInterface {
    constructor(private readonly service: AuthServiceInterface<User>) { }

    async getAuthUrl(_request: RequestInterface, reply: ReplyInterface): Promise<void> {
        const url = this.service.getAuthUrl()
        
        reply.status(200)
            .send(url)
    }

    async handleCallback(request: RequestInterface<unknown, unknown, GoogleCodeString>, reply: ReplyInterface): Promise<void> {
        const { code } = request.query

        const googleUser = await this.service.handleCallback(code)

        const payload = {
            id: googleUser.id,
            email: googleUser.email,
            name: googleUser.name,
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            { expiresIn: '8h' }
        )

        reply.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`)
    }
}