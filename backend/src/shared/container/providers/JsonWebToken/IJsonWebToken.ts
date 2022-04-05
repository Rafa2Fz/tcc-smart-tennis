
export interface iJsonWebToken {
    sign<T extends object>(payload: T, subject: string): Promise<string>
}