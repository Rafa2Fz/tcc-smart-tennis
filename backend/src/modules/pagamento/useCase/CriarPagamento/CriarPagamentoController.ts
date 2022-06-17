import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarPagamentoUseCase } from "./CriarPagamentoUseCase";

export class CriarPagamentoController {
    async index(request: Request, response: Response) {
        const criarPagamentoUseCase = container.resolve(CriarPagamentoUseCase)
        const usuarioId = request.usuario.id
        const {pacote} = request.body
      
        const preferencias = await criarPagamentoUseCase.execute({usuarioId, pacote});
 
        response.json(preferencias)
    }
}