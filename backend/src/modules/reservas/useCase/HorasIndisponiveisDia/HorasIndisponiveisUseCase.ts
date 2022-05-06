
import { IReservaQuadraRepositorio } from "modules/reservas/repositories/IReservaQuadraRepositorio";
import { inject, injectable } from "tsyringe";

interface Request {
    date: {
        ano: number,
        mes: number,
        dia: number
    },
    quadraId: number
    personal: boolean
    usuarioId?: string
}

@injectable()
export class HorasIndisponiveisUseCase {
    constructor(
        @inject('ReservaQuadraRepositorio')
        private reservaQuadraRepositorio: IReservaQuadraRepositorio,
    ) { }

    async execute({date, quadraId, personal, usuarioId}: Request): Promise<number[]> {
        const {ano, mes, dia} =  date
        const verificaData = new Date(ano, mes, dia)
        const expediente = [6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17]

        
        const horasIndisponiveis = await this.reservaQuadraRepositorio.horariosIndisponiveisDia(verificaData, quadraId)

        

        const reservas = await this.reservaQuadraRepositorio.reservasUsuarioDia(verificaData, usuarioId)
        
        if(reservas.length > 0) {
            for(let i = 0;  i < reservas.length; i++) {
                let hora = reservas[i].horario.getHours()
                if(!horasIndisponiveis.includes(hora)){
                    horasIndisponiveis.push(hora)
                }
            }
        }

        if(personal) {
            for(let i = 0;  i < expediente.length; i++) {
             verificaData.setHours(expediente[i])

             const personalDisponivel = await this.reservaQuadraRepositorio.verificarHorarioPersonalDisponivel(verificaData, quadraId)

             if(!personalDisponivel) {
              if(!horasIndisponiveis.includes(expediente[i]) ){
                  horasIndisponiveis.push(expediente[i])
              }
             }
                
            }
        }
 

        return horasIndisponiveis
    }
}