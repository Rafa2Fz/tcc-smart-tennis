import { TipoUsuario } from 'entity/TipoUsuario';
import { Usuario } from 'entity/Usuario';
import { getRepository, Repository } from 'typeorm';
import { IUsuarioRepositorio } from './IUsuarioRepositorio';

export class UsuarioRepositorio implements IUsuarioRepositorio {
  public usuarioRepositorio: Repository<Usuario>;

  public tipoUsuarioRepositorio: Repository<TipoUsuario>;

  constructor() {
    this.usuarioRepositorio = getRepository(Usuario);
    this.tipoUsuarioRepositorio = getRepository(TipoUsuario);
  }

  public async criar(usuarioData: Pick<Usuario, 'email' | 'nome' | 'password' | 'tipoUsuarioId'>): Promise<Usuario> {
    const {
      email, nome, password, tipoUsuarioId,
    } = usuarioData;

    const tipoUsuario = await this.tipoUsuarioRepositorio.findOne(tipoUsuarioId);

    if (!tipoUsuario) {
      throw new Error('Tipo de usuário inválido!');
    }

    const usuario = this.usuarioRepositorio.create({
      nome,
      email,
      password,
      tipoUsuario,
    });

    await this.usuarioRepositorio.save(usuario);

    delete usuario.password;
    return usuario;
  }

  public async buscarPorEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.usuarioRepositorio.findOne({ where: { email } });

    return usuario;
  }

  public async buscarPorId(id: string): Promise<Usuario | undefined> {
    const usuario = await this.usuarioRepositorio.findOne({ where: { id } });

    return usuario;
  }

  async atualizarCreditoUsuario(usuario: Usuario): Promise<Usuario> {
    const usuarioAtualizado = await this.usuarioRepositorio.save(usuario);
    return usuarioAtualizado;
  }
}
