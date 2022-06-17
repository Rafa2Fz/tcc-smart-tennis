import { VerificarStatusPagamentoUseCase } from './VerificarStatusPagamentoUseCase';
import { Request, Response } from "express";
import { container } from "tsyringe";


export class VerificarPagamentoController {
    async index(request: Request, response: Response) {
        const verificarPagamento = container.resolve(VerificarStatusPagamentoUseCase)
  
        const {data, action } = request.body
      
        const preferencias = await verificarPagamento.execute({data, action});
 

    }
}