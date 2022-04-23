import { CriarReservaController } from './../useCase/CriarReserva/CriarReservaController';
import { Router } from "express";
import { DiasIndisponiveisMesController } from '../useCase/DiasIndisponiveisMes/DiasIndisponiveisMesController';
import { HorasIndisponiveisController } from '../useCase/HorasIndisponiveisDia/HorasIndisponiveisController';
import { ensureAuthenticated } from 'shared/http/middleware/ensureAuthenticate';

const reservasRotas = Router();

const criarReservaController = new CriarReservaController();
const reservasMesDisponiveisController = new DiasIndisponiveisMesController()
const horasIndisponiveisController = new HorasIndisponiveisController()

reservasRotas.use(ensureAuthenticated)
reservasRotas.post('/', criarReservaController.index)
reservasRotas.post('/verificarDiasIndisponiveisMes', reservasMesDisponiveisController.index)
reservasRotas.post('/verificaHorasIndisponiveis', horasIndisponiveisController.index)

export default reservasRotas