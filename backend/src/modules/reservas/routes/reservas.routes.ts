import { CriarReservaController } from './../useCase/CriarReserva/CriarReservaController';
import { Router } from "express";
import { DiasIndisponiveisMesController } from '../useCase/DiasIndisponiveisMes/DiasIndisponiveisMesController';
import { HorasIndisponiveisController } from '../useCase/HorasIndisponiveisDia/HorasIndisponiveisController';
import { ReservasAlunosController } from '../useCase/ReservasAlunos/ReservasAlunosController';


const reservasRotas = Router();

const criarReservaController = new CriarReservaController();
const reservasMesDisponiveisController = new DiasIndisponiveisMesController()
const horasIndisponiveisController = new HorasIndisponiveisController()
const reservasAlunosController = new ReservasAlunosController()


reservasRotas.post('/', criarReservaController.index)
reservasRotas.post('/verificarDiasIndisponiveisMes', reservasMesDisponiveisController.index)
reservasRotas.post('/verificaHorasIndisponiveis', horasIndisponiveisController.index)
reservasRotas.post('/buscarReservasAlunosDia', reservasAlunosController.index)

export default reservasRotas