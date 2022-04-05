import './providers'
import { container, delay } from 'tsyringe';

import { IUsuarioRepositorio } from 'modules/usuario/repositories/IUsuarioRepositorio';
import { UsuarioRepositorio } from 'modules/usuario/repositories/UsuarioRepositorio';
import { IReservaQuadraRepositorio } from 'modules/reservas/repositories/IReservaQuadraRepositorio';
import { ReservaQuadraRepositorio } from 'modules/reservas/repositories/ReservaQuadraRepositorio';





container.registerSingleton<IUsuarioRepositorio>('UsuarioRepositorio', UsuarioRepositorio)
container.registerSingleton<IReservaQuadraRepositorio>('ReservaQuadraRepositorio', ReservaQuadraRepositorio)