import { ReservasAlunosUseCase } from './ReservasAlunosUseCase';
import { Request, Response } from "express";
import { container } from "tsyringe";



export class ReservasAlunosController {

    async index(request: Request, response: Response) {
        const reservasAlunosUseCase = container.resolve(ReservasAlunosUseCase)
        const {date, quadraId, usuarioId} = request.body
     
        
        const reservas = await reservasAlunosUseCase.execute({date, quadraId})
        
        response.json(reservas)
    }
}