import { Router } from "express";
import reservasRotas from "modules/reservas/routes/reservas.routes";
import sessionRotas from "modules/usuario/routes/session.routes";
import usuarioRotas from "modules/usuario/routes/usuario.routes";
import folgaRotas from "modules/folga/routes/folga.routes";

const rotas = Router()

rotas.use('/usuario', usuarioRotas)
rotas.use('/auth', sessionRotas)
rotas.use('/reservas', reservasRotas)
rotas.use('/folga', folgaRotas)


export default rotas