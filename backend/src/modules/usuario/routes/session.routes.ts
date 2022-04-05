import { Router } from "express";
import { AutenticarUsuarioController } from "../useCase/AutenticarUsuario/AutenticarUsuarioController";

const sessionRotas = Router()

const autenticarUsuarioController = new AutenticarUsuarioController()

sessionRotas.post('/', autenticarUsuarioController.handle)

export default sessionRotas