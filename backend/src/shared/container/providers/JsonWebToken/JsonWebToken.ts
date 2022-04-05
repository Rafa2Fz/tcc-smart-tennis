import { iJsonWebToken } from "./IJsonWebToken";
import { sign } from 'jsonwebtoken'
import authConfig from 'config/auth'

export class JsonWebToken implements iJsonWebToken {

    public async sign<T extends object>(payload: T, subject: string): Promise<string> {
        const { secret, options } = authConfig

        const token = sign(payload, secret, { ...options, subject })

        return token
    }


}