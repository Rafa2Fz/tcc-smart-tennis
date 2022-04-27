import { NextFunction, Request, Response } from "express";

import { container } from "tsyringe";
import { CriarUsuarioUseCase } from "./CriarUsuarioUseCase";


export class CriarUsuarioController {
    public async handler(request: Request, response: Response, next: NextFunction) {
        
        const criarUsuarioUseCase = container.resolve(CriarUsuarioUseCase)
        const { email, nome, password } = request.body

        const usuario = await criarUsuarioUseCase.executar({ email, nome, password })
        return response.json(usuario)
    }
}