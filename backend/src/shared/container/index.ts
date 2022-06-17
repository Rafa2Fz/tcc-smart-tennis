import './providers'
import { container, delay } from 'tsyringe';

import { IUsuarioRepositorio } from 'modules/usuario/repositories/IUsuarioRepositorio';
import { UsuarioRepositorio } from 'modules/usuario/repositories/UsuarioRepositorio';

import { IReservaQuadraRepositorio } from 'modules/reservas/repositories/IReservaQuadraRepositorio';
import { ReservaQuadraRepositorio } from 'modules/reservas/repositories/ReservaQuadraRepositorio';

import { IFolgaRepositorio } from 'modules/folga/repositories/IFolgaRepositorio';
import { FolgaRepositorio } from 'modules/folga/repositories/FolgaRepositorio';

import { IPagamentoRepositorio } from 'modules/pagamento/repositories/IPagamentoRepositorio';
import { PagamentoRepositorio } from 'modules/pagamento/repositories/PagamentoRepositorio';


container.registerSingleton<IUsuarioRepositorio>('UsuarioRepositorio', UsuarioRepositorio)
container.registerSingleton<IReservaQuadraRepositorio>('ReservaQuadraRepositorio', ReservaQuadraRepositorio)
container.registerSingleton<IFolgaRepositorio>('FolgaRepositorio', FolgaRepositorio)
container.registerSingleton<IPagamentoRepositorio>('PagamentoRepositorio', PagamentoRepositorio)