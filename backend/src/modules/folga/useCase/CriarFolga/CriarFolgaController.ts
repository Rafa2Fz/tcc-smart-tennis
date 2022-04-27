import { Request, Response } from "express";
import {container} from 'tsyringe'
import { CriarFolgaUseCase } from "./CriarFolgaUseCase";


export class CriarFolgaController {
   async index(request: Request, response: Response) {
    const criarFolgaUseCase = container.resolve(CriarFolgaUseCase)
   const usuarioId = request.usuario.id
    const { data} = request.body

   const folga = await criarFolgaUseCase.execute({usuarioId, data})

    response.json(folga)
 }
}