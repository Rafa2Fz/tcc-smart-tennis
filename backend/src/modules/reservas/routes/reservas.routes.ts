import { CriarReservaController } from './../useCase/CriarReserva/CriarReservaController';
import { Router } from "express";
import { DiasIndisponiveisMesController } from '../useCase/DiasIndisponiveisMes/DiasIndisponiveisMesController';

const reservasRotas = Router();

const criarReservaController = new CriarReservaController();
const reservasMesDisponiveisController = new DiasIndisponiveisMesController()

reservasRotas.post('/', criarReservaController.index)
reservasRotas.post('/verificarDiasIndisponiveisMes', reservasMesDisponiveisController.index)

export default reservasRotas