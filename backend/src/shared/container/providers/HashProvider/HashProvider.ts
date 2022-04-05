import { IHashProvider } from "./IHashProvider";
import { compare, hash } from 'bcryptjs'
import { AppError } from "shared/error/AppError";

export class HashProvider implements IHashProvider {
    public async gerarHash(senha: string, salt: number): Promise<string> {
        if (typeof senha != 'string') {
            throw new AppError('A senha deve conter números e letras!', 400)
        }
        const senhaGerada = await hash(senha, salt)
        return senhaGerada
    }

    public async compare(senhaLimpa: string, senhaCriptografada: string): Promise<Boolean> {
        const senhaIgual = await compare(senhaLimpa, senhaCriptografada)
        return senhaIgual
    }
}