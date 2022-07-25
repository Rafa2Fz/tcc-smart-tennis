import FakeUsersRepository from 'modules/usuario/repositories/Fake/FakeUsersRepository';
// import { HashProvider } from 'shared/container/providers/HashProvider/HashProvider';
// import { CriarUsuarioUseCase } from './CriarUsuarioUseCase';

// let criarUsuario: CriarUsuarioUseCase;
let fakeUsersRepository: FakeUsersRepository;

describe('Create a new user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    // const hashProvider = new HashProvider();
    // criarUsuario = new CriarUsuarioUseCase(fakeUsersRepository, hashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.criar({
      nome: 'Rafael', email: 'test@gmail.com', password: '12354Abcd', tipoUsuarioId: 1,
    });
    expect(user).toHaveProperty('id');
  });
});
