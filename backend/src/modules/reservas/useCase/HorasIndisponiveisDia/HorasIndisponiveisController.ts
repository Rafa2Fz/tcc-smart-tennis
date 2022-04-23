import { Request, Response } from "express";
import { container } from "tsyringe";

import { HorasIndisponiveisUseCase } from "./HorasIndisponiveisUseCase";

export class HorasIndisponiveisController {

    async index(request: Request, response: Response) {
        const horasIndisponiveisUseCase = container.resolve(HorasIndisponiveisUseCase)
        const {date, quadraId} = request.body
        
        const indisponiveis = await horasIndisponiveisUseCase.execute({date, quadraId })
        
        response.json(indisponiveis)
    }
}