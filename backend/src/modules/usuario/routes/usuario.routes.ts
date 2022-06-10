import { Request, Router } from "express";
import { ensureAuthenticated } from "shared/http/middleware/ensureAuthenticate";
import { AdicionarCreditoUsuarioController } from "../useCase/AdicionarCreditoUsuario/AdicionarCreditoUsuarioController";
import { BuscarUsuarioController } from "../useCase/BuscarUsuario/BuscarUsuarioController";


import { CriarUsuarioController } from "../useCase/CriarUsuario/CriarUsuarioController";



const usuarioRotas = Router()
const buscarUsuarioController = new BuscarUsuarioController();
const criarUsuarioController = new CriarUsuarioController();
const adicionarCreditoUsuarioController = new AdicionarCreditoUsuarioController();



usuarioRotas.post('/', criarUsuarioController.handler)
usuarioRotas.post('/buscar', ensureAuthenticated, buscarUsuarioController.index)
usuarioRotas.post('/adicionarCredito', ensureAuthenticated, adicionarCreditoUsuarioController.index)

export default usuarioRotas