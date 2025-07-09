    import type { RequestInterface, ReplyInterface } from '../types/common/http-interfaces'
    import type { User } from '../types/dtos/user-dto'
    import { UnauthorizedError } from '../utils/error/unauthorized-error'
    import jwt from 'jsonwebtoken'

    interface AuthHeaders {
        authorization?: string
    }

    export async function authMiddleware(
        request: RequestInterface,
        reply: ReplyInterface
    ): Promise<void> {
        try {
            const token = (request.headers as AuthHeaders).authorization?.split(' ')[1]

            if (!token) {
                throw new UnauthorizedError("Authentication token not provided")
            }

            const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as User

            request.user = decoded

        } catch (err) {
            throw new UnauthorizedError("Invalid or expired token")
        }
    }
