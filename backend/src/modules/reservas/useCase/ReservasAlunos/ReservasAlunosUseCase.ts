import { ReservaQuadra } from './../../../../entity/ReservaQuadra';
import { IReservaQuadraRepositorio } from './../../repositories/IReservaQuadraRepositorio';
import { inject, injectable } from "tsyringe";

interface Request {
    date: {
        ano: number,
        mes: number,
        dia: number
    },
    quadraId?: string
}

@injectable()
export class ReservasAlunosUseCase {
    constructor(
        @inject('ReservaQuadraRepositorio')
        private reservaQuadraRepositorio: IReservaQuadraRepositorio
    ){}

    async execute({date, quadraId}: Request): Promise<ReservaQuadra[]> {

        const {dia, mes, ano} = date
        const verificaData = new Date(ano, mes, dia)
        verificaData.setHours(0)
        const reservas = await this.reservaQuadraRepositorio.buscarReservasDia(verificaData)
        return reservas
    }
 }