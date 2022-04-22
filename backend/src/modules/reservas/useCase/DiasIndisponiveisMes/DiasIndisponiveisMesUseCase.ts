import { getDate, getDay, getDaysInMonth, isThisMonth } from 'date-fns';
import { IFolgaRepositorio } from 'modules/folga/repositories/IFolgaRepositorio';
import { IReservaQuadraRepositorio } from 'modules/reservas/repositories/IReservaQuadraRepositorio';
import { inject, injectable } from 'tsyringe';

interface Request {
    date: {
        ano: number,
        mes: number,
        dia: number
    },
    quadraId: number
}

@injectable()
export class DiasIndisponiveisMesUseCase {

    constructor(
        @inject('ReservaQuadraRepositorio')
        private reservaQuadraRepositorio: IReservaQuadraRepositorio,
        @inject('FolgaRepositorio')
        private folgaRepositorio: IFolgaRepositorio
    ) {}

     async execute({date, quadraId}: Request): Promise<number[]> {
        const expedienteHora =[6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17]

        const {ano, mes, dia} =  date
        const diasIndisponiveisMes = []
        const verificaData = new Date(ano, mes, dia)
        const diasNoMes = getDaysInMonth(verificaData)
       if(isThisMonth(verificaData)){
           for(let i = 1; i < dia ; i++) {        
               diasIndisponiveisMes.push(i)
           }
       }
        for(let i = 1; i <= diasNoMes ; i++) {
            let data = new Date(ano, mes, i); 
            if(data.getDay() == 0 || data.getDay() == 6) {
                if(!diasIndisponiveisMes.includes(data.getDate())){
                    diasIndisponiveisMes.push(data.getDate())
                }
            }
        }

        const folgas = await this.folgaRepositorio.verificarFolgasMes(verificaData)
       
            for(let i = 0; i < folgas.length; i++) {  
                const folgaDia = folgas[i].data.getDate()
                if(!diasIndisponiveisMes.includes(folgaDia)){
                   
                    diasIndisponiveisMes.push(folgaDia)
                }  
            }
        const reservas = await this.reservaQuadraRepositorio.verificarReservasMes(verificaData)
        
        for(let i = 0; i < reservas.length; i++) {
            if(reservas[i].quadra.id === quadraId) {
                const dia = reservas[i].horario.getDate()
                if(!diasIndisponiveisMes.includes(dia)){
                    const horasIndisponiveis = await this.reservaQuadraRepositorio.horariosIndisponiveisDia(reservas[i].horario, reservas[i].quadra.id)
                    const diaIndisponivel = expedienteHora.every((valor) => horasIndisponiveis.includes(valor))
                    if(diaIndisponivel){
                        diasIndisponiveisMes.push(dia)
                    }

                }
            }

        }

     
       return diasIndisponiveisMes
     
    } 
}