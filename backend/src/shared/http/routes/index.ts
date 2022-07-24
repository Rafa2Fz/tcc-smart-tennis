import { Router } from 'express';
import reservasRotas from 'modules/reservas/routes/reservas.routes';
import sessionRotas from 'modules/usuario/routes/session.routes';
import usuarioRotas from 'modules/usuario/routes/usuario.routes';
import folgaRotas from 'modules/folga/routes/folga.routes';
import pagamentoRotas from 'modules/pagamento/routes/pagamento.routes';
import { ensureAuthenticated } from '../middleware/ensureAuthenticate';

const rotas = Router();

rotas.use('/usuario', usuarioRotas);
rotas.use('/auth', sessionRotas);
rotas.use('/reservas', ensureAuthenticated, reservasRotas);
rotas.use('/folga', ensureAuthenticated, folgaRotas);
rotas.use('/pagamento', pagamentoRotas);

export default rotas;
