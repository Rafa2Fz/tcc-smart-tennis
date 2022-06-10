
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AdicionaCreditoUsuarioUseCase } from "./AdicionarCreditoUsuarioUseCase";


export class AdicionarCreditoUsuarioController {
    async index(request: Request, response: Response) {
     const adicionarCreditoUsuarioUseCase = container.resolve(AdicionaCreditoUsuarioUseCase)
     
     const {email, quantidade}= request.body
     const idAdmin = request.usuario.id

     const result = await adicionarCreditoUsuarioUseCase.execute({idAdmin, email, quantidade})
     
     response.json(result)
    }
}