import { Request, Response } from "express";
import { container } from "tsyringe";
import { DiasIndisponiveisMesUseCase } from "./DiasIndisponiveisMesUseCase";

export class DiasIndisponiveisMesController {

    async index(request: Request, response: Response) {
        const reservasMesDisponiveis = container.resolve(DiasIndisponiveisMesUseCase)
        const {date, quadraId} = request.body
        
        const indisponiveis = await reservasMesDisponiveis.execute({date, quadraId })

        response.json(indisponiveis)
    }
}