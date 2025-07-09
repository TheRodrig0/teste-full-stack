import type { AuthServiceInterface } from "../types/auth-interfaces"
import type { BaseCrudInterface } from "../types/crud-interfaces"
import type { CreateUser, User } from "../types/dtos/user-dto"
import { BadRequestError } from "../utils/error/bad-request-error"

export class GoogleAuthService implements AuthServiceInterface<User> {
    constructor(private readonly userService: BaseCrudInterface<CreateUser, User>) { }

    public getAuthUrl(): { url: string } {
        const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"

        const options = {
            redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
            client_id: process.env.GOOGLE_CLIENT_ID as string,
            access_type: "offline",
            response_type: "code",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ].join(" "),
        }

        const qs = new URLSearchParams(options)

        return { url: `${rootUrl}?${qs.toString()}` }
    }

    public async handleCallback(code: string): Promise<User> {
        if (!code) {
            throw new BadRequestError("Authentication code not provided by Google")
        }

        const { id_token, access_token } = await this.getGoogleTokens(code)

        const googleUserProfile = await this.getGoogleUser({
            id_token,
            access_token
        })

        const existingUser = await this.userService.findOne({ email: googleUserProfile.email })

        if (existingUser) {
            return existingUser
        }

        const newUser = await this.userService.create({
            email: googleUserProfile.email,
            name: googleUserProfile.name
        })

        return newUser
    }

    private async getGoogleTokens(code: string): Promise<{ id_token: string, access_token: string }> {
        const url = "https://oauth2.googleapis.com/token"

        const values = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID as string,
            client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
            grant_type: "authorization_code",
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(values),
        })

        if (!res.ok) {
            throw new BadRequestError("Failed to fetch user token from Google")
        }

        return res.json()
    }

    private async getGoogleUser(tokens: { id_token: string, access_token: string }): Promise<User> {
        const res = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            { headers: { Authorization: `Bearer ${tokens.id_token}` } }
        )

        if (!res.ok) {
            throw new BadRequestError('Failed to fetch user information from Google')
        }

        return res.json()
    }
}
