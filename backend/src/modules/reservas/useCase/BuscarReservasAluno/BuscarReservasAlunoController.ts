import { BuscarReservasAlunoUseCase } from './BuscarReservasAlunoUseCase';

import { Request, Response } from "express";
import { container } from "tsyringe";



export class BuscarReservasAlunoController {

    async index(request: Request, response: Response) {
        const  buscarReservasAluno= container.resolve(BuscarReservasAlunoUseCase)
         const usuarioId = request.usuario.id
     
        
        const reservas = await buscarReservasAluno.execute({usuarioId})
        
        response.json(reservas)
    }
}