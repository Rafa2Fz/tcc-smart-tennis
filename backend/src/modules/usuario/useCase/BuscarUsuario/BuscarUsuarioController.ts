import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { BuscarUsuarioUseCase } from './BuscarUsuarioUseCase';

export class BuscarUsuarioController {
  public async index(request: Request, response: Response) {
    const buscarUsuario = container.resolve(BuscarUsuarioUseCase);

    const { email } = request.query;

    const tipoUsuarioRequest = request.usuario.tipoUsuario.name;

    if (email && tipoUsuarioRequest === 'admin') {
      const usuario = await buscarUsuario.execute({ email });

      response.json(usuario);
    } else {
      const { email } = request.usuario;
      const usuario = await buscarUsuario.execute({ email });

      response.json(usuario);
    }
  }
}
