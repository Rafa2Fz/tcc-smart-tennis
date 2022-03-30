import { container } from 'tsyringe';

import { IUsuarioRepositorio } from 'modules/usuario/repositories/IUsuarioRepositorio';
import { UsuarioRepositorio } from 'modules/usuario/repositories/UsuarioRepositorio';

container.registerSingleton<IUsuarioRepositorio>('UsuarioRepositorio', UsuarioRepositorio)