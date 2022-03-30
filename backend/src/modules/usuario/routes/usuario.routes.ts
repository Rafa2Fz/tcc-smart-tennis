import { Request, Router } from "express";

import { CriarUsuarioController } from "../useCase/CriarUsuario/CriarUsuarioController";

const usuarioRotas = Router()
const criarUsuarioController = new CriarUsuarioController();



usuarioRotas.post('/', criarUsuarioController.criar)

export default usuarioRotas