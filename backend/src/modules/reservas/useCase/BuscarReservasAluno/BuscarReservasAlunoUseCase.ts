import { ReservaQuadra } from './../../../../entity/ReservaQuadra';
import { IReservaQuadraRepositorio } from './../../repositories/IReservaQuadraRepositorio';
import { inject, injectable } from "tsyringe";
import { IUsuarioRepositorio } from 'modules/usuario/repositories/IUsuarioRepositorio';
import { AppError } from 'shared/error/AppError';

interface Request {
    date?: {
        ano: number,
        mes: number,
        dia: number
    },
    quadraId?: string,
    usuarioId?: string
}

@injectable()
export class BuscarReservasAlunoUseCase {
    constructor(
        @inject('UsuarioRepositorio')
        private usuarioRepositorio: IUsuarioRepositorio,
        @inject('ReservaQuadraRepositorio')
        private reservaQuadraRepositorio: IReservaQuadraRepositorio
    ){}

    async execute({ usuarioId}: Request): Promise<ReservaQuadra[]> {

        const usuario = await this.usuarioRepositorio.buscarPorId(usuarioId);

      
        if(!usuario) {
            throw new AppError('Usuário inválido!', 400)
        }

     
        const reservas = await this.reservaQuadraRepositorio.buscarTodasAsReservasDoAluno(usuario)
        return reservas
    }
 }

 