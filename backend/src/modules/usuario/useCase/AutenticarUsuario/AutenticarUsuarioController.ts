import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutenticarUsuario } from "./AutenticarUsuarioUseCase";

export class AutenticarUsuarioController {

    public async handle(request: Request, response: Response) {
        const { email, password } = request.body
       
        const autenticaUsuario = container.resolve(AutenticarUsuario)

        const token = await autenticaUsuario.execute({ email, password })


        response.json(token)
    }
}