import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DiasIndisponiveisMesUseCase } from './DiasIndisponiveisMesUseCase';

export class DiasIndisponiveisMesController {
  async index(request: Request, response: Response) {
    const diasIndisponiveisMesUseCase = container.resolve(DiasIndisponiveisMesUseCase);
    const {
      dia, mes, ano, quadraId,
    } = request.query;

    const indisponiveis = await diasIndisponiveisMesUseCase.execute({
      dia: Number(dia), mes: Number(mes), ano: Number(ano), quadraId: Number(quadraId),
    });

    response.json(indisponiveis);
  }
}
