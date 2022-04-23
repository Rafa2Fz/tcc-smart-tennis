import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import authConfig from 'config/auth'
import { AppError } from "shared/error/AppError";

interface Payload {
    id: string
    nome: string
    email: string
    tipoUsuario: {
        id: number,
        name: string
    }
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const token = request.headers.authorization?.split(' ')[1]

    if (!token) {

        throw new AppError('Token de autenticação inválido ou inexistente!', 500)
    }

    const { secret } = authConfig

    const tokenValido = verify(token, secret)

    const { id, nome, email, tipoUsuario } = tokenValido as Payload
    console.log({id, nome, email, tipoUsuario})
    request.usuario = {
        id,
        nome,
        email,
        tipoUsuario
    }

    next()

}