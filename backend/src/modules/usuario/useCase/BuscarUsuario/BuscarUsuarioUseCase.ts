import { IUsuarioDTO } from 'modules/usuario/dto/IUsuarioDTO';
import { IUsuarioRepositorio } from 'modules/usuario/repositories/IUsuarioRepositorio';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface Request {
    email: string;
}

@injectable()
export class BuscarUsuarioUseCase {
  constructor(
        @inject('UsuarioRepositorio')
        private usuarioRepositorio: IUsuarioRepositorio,
  ) {}

  async execute({ email }: Request): Promise<IUsuarioDTO> {
    if (!email) {
      throw new AppError('E-mail usuário inválido!', 400);
    }

    const usuario = await this.usuarioRepositorio.buscarPorEmail(email);

    if (!usuario) {
      throw new AppError('Usuário inexistente', 400);
    }
    const credito = usuario.getCredito;
    delete usuario.password;

    return { ...usuario, credito, avatar_url: usuario.avatarUrl };
  }
}
