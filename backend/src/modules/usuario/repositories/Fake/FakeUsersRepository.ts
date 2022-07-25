import { Usuario } from 'entity/Usuario';
import { IUsuarioRepositorio } from '../IUsuarioRepositorio';

export default class FakeUsersRepository implements IUsuarioRepositorio {
  private usuarios: Usuario[] = [];

  public async criar(userData:Pick<Usuario, 'email' | 'nome' | 'password' | 'tipoUsuarioId'>): Promise<Usuario> {
    const user = new Usuario();
    const randomId = (Math.random() + 1).toString(36).substring(7);

    Object.assign(user, {
      id: randomId,
    }, {
      userData,
    });
    this.usuarios.push(user);
    return user;
  }

  public salvar(usuario: Usuario): Promise<Usuario> {
    throw 'Not Implemented';
  }

  public buscarPorId(id: string): Promise<Usuario> {
    throw 'Not Implemented';
  }

  public atualizarCreditoUsuario(usuario: Usuario): Promise<Usuario> {
    throw 'Not Implemented';
  }

  public buscarPorEmail(email: string): Promise<Usuario> {
    throw 'Not Implemented';
  }
}
