
import { IReservaQuadraRepositorio } from "modules/reservas/repositories/IReservaQuadraRepositorio";
import { inject, injectable } from "tsyringe";

interface Request {
    date: {
        ano: number,
        mes: number,
        dia: number
    },
    quadraId: number
}

@injectable()
export class HorasIndisponiveisUseCase {
    constructor(
        @inject('ReservaQuadraRepositorio')
        private reservaQuadraRepositorio: IReservaQuadraRepositorio,
    ) { }

    async execute({date, quadraId}: Request): Promise<number[]> {
        const {ano, mes, dia} =  date
        const verificaData = new Date(ano, mes, dia)
        
        const horasIndisponiveis = await this.reservaQuadraRepositorio.horariosIndisponiveisDia(verificaData, quadraId)

        return horasIndisponiveis
    }
}