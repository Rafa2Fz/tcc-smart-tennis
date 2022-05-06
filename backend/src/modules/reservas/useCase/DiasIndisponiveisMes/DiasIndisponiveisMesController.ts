import { Request, Response } from "express";
import { container } from "tsyringe";
import { DiasIndisponiveisMesUseCase } from "./DiasIndisponiveisMesUseCase";

export class DiasIndisponiveisMesController {

    async index(request: Request, response: Response) {
        const diasIndisponiveisMesUseCase = container.resolve(DiasIndisponiveisMesUseCase)
        const {date, quadraId} = request.body

        const indisponiveis = await diasIndisponiveisMesUseCase.execute({date, quadraId })
       
        response.json(indisponiveis)
    }
}