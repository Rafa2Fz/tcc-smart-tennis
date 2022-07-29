import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { HorasIndisponiveisUseCase } from './HorasIndisponiveisUseCase';

export class HorasIndisponiveisController {
  async index(request: Request, response: Response) {
    const horasIndisponiveisUseCase = container.resolve(HorasIndisponiveisUseCase);
    const {
      ano, mes, dia, quadraId, personal,
    } = request.query;
    const usuarioId = request.usuario.id;

    const indisponiveis = await horasIndisponiveisUseCase.execute({
      dia: Number(dia), mes: Number(mes), ano: Number(ano), quadraId: Number(quadraId), personal, usuarioId,
    });

    response.json(indisponiveis);
  }
}
