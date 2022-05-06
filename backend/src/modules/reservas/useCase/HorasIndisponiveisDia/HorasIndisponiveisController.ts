import { Request, Response } from "express";
import { container } from "tsyringe";

import { HorasIndisponiveisUseCase } from "./HorasIndisponiveisUseCase";

export class HorasIndisponiveisController {

    async index(request: Request, response: Response) {
        const horasIndisponiveisUseCase = container.resolve(HorasIndisponiveisUseCase)
        const {date, quadraId, personal} = request.body
        const usuarioId = request.usuario.id
        
        const indisponiveis = await horasIndisponiveisUseCase.execute({date, quadraId, personal, usuarioId })
        
        response.json(indisponiveis)
    }
}