import { CriarReservaController } from './../useCase/CriarReserva/CriarReservaController';
import { Router } from "express";

const reservasRotas = Router();

const criarReservaController = new CriarReservaController();

reservasRotas.post('/', criarReservaController.index)

export default reservasRotas