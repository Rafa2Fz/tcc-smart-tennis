
import { Router } from "express";
import { CriarFolgaController } from "../useCase/CriarFolga/CriarFolgaController";

const folgaRotas = Router()
const criarFolgaController = new CriarFolgaController()
folgaRotas.post('/', criarFolgaController.index )
export default folgaRotas