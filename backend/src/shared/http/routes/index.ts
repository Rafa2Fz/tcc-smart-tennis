import { Router } from "express";
import usuarioRotas from "modules/usuario/routes/usuario.routes";

const rotas = Router()

rotas.use('/usuario', usuarioRotas)


export default rotas