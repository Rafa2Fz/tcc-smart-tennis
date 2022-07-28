import { Usuario } from 'entity/Usuario';
import FakeUsersRepository from 'modules/usuario/repositories/Fake/FakeUsersRepository';
import { HashProvider } from 'shared/container/providers/HashProvider/HashProvider';
import { AppError } from 'shared/error/AppError';
import { CriarUsuarioUseCase } from './CriarUsuarioUseCase';

let criarUsuario: CriarUsuarioUseCase;
let fakeUsersRepository: FakeUsersRepository;

describe('Create a new user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    const hashProvider = new HashProvider();
    criarUsuario = new CriarUsuarioUseCase(fakeUsersRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await criarUsuario.executar({
      nome: 'Rafael', email: 'test@gmail.com', password: '12354Abcd',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create to user with two same emails', async () => {
    await criarUsuario.executar({
      nome: 'Rafael',
      email: 'teste@gmail.com',
      password: '12354Abcd',
    });

    try {
      await criarUsuario.executar({
        nome: 'Rafael',
        email: 'teste@gmail.com',
        password: '12354Abcd',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });
});
