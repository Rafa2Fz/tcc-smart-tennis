import { Router } from "express";
import { ensureAuthenticated } from "shared/http/middleware/ensureAuthenticate";
import { CriarPagamentoController } from "../useCase/CriarPagamento/CriarPagamentoController";
import { VerificarPagamentoController } from "../useCase/VerificarStatusPagamento/VerificarPagamentoController";

const pagamentoRotas = Router()

const criarPagamentoController = new CriarPagamentoController()
const verificarPagamentoController = new VerificarPagamentoController()

pagamentoRotas.post('/', ensureAuthenticated,criarPagamentoController.index)
pagamentoRotas.post('/verificaPagamento', verificarPagamentoController.index)

export default pagamentoRotas;