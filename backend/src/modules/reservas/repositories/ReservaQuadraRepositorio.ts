import { IReservaQuadraRepositorio } from "./IReservaQuadraRepositorio";

import { Between, getRepository, Repository } from "typeorm";
import { Usuario } from "entity/Usuario";
import { ReservaQuadra } from "entity/ReservaQuadra";
import { Quadra } from "entity/Quadra";
import { Folga } from "entity/Folga";
import { getDaysInMonth } from "date-fns";



export class ReservaQuadraRepositorio implements IReservaQuadraRepositorio {
    private usuarioRepositorio: Repository<Usuario>
    private reservaRepositorio: Repository<ReservaQuadra>
    private quadraRepositorio: Repository<Quadra>
    private folgaRepositorio: Repository<Folga>

    constructor() {
        this.usuarioRepositorio = getRepository(Usuario)
        this.reservaRepositorio = getRepository(ReservaQuadra)
        this.quadraRepositorio = getRepository(Quadra)
        this.folgaRepositorio = getRepository(Folga)
    }

    public async criar(usuario: Usuario, quadraId: number, horarioReserva: Date, personal: boolean): Promise<ReservaQuadra> {
        const quadra = await this.quadraRepositorio.findOne(quadraId)
        const reservaQuadra = this.reservaRepositorio.create({
            usuario,
            quadra,
            horario: horarioReserva,
            personal,
        })

        return reservaQuadra
    }

    public async salvar(reservaQuadra: ReservaQuadra): Promise<ReservaQuadra> {
        const reserva = await this.reservaRepositorio.save(reservaQuadra)

        return reserva
    }

    public async encontrarReservas(data: Date, quadraId: number): Promise<[ReservaQuadra[], number]> {
        const quadra = await this.quadraRepositorio.findOne(quadraId)
        const reserva = await this.reservaRepositorio.findAndCount({ where: { horario: data, quadra } })

        return reserva
    }

    public async verificarDataDisponivel(data: Date, quadraId: number): Promise<Boolean> {
        let disponivel = true
        const reservas = await this.encontrarReservas(data, quadraId)
        const [, vagas] = reservas

        if (quadraId == 1 && vagas >= 4) {
            return disponivel = false
        }

        if (quadraId == 2 && vagas >= 1) {
            return disponivel = false
        }

        return disponivel

    }

    async verificarHorarioPersonalDisponivel(data: Date, quadraId: number): Promise<Boolean> {
        let disponivel = true
        const idOposto = quadraId === 1? 2:1
       
        const reservas = await this.encontrarReservas(data, idOposto)
        const [obj, vagas] = reservas
        
        if(vagas >= 1) {
         const personal = obj[0].personal

        if(quadraId === 1  && vagas >= 1) {
            if(personal) {
         
                return false
            }
        }
        
        if(quadraId === 2) {
            if(vagas >= 1) {
              
                return false
            }
        }
        }

        return disponivel
    }

    async verificarReservaUsuario(data: Date, usuario: Usuario): Promise<ReservaQuadra | undefined> {
        const reserva = await this.reservaRepositorio.findOne({where: {horario: data, usuario}})
        return reserva
    }    
    
    async verificarReservaPorDia(data: Date): Promise<ReservaQuadra | undefined> {
     
        const dataFim = new Date(data)
        dataFim.setHours(23, 59, 59)
       
        const reserva = await this.reservaRepositorio.findOne({
            where: {
                horario: Between(data, dataFim)
                
            }
        })

        return reserva
    }

    async verificarReservasMes(data: Date): Promise<ReservaQuadra[]> {
        const ano = data.getFullYear()
        const mes = data.getMonth()
        
        
        const dataInicio = new Date(ano, mes, 1)
        const dataFim = new Date(ano,mes, getDaysInMonth(data))
        
      
        const reserva = await this.reservaRepositorio.find({
            where: {
                horario: Between(data, dataFim)
                
            }
        })

        
        return reserva
    }

   async horariosIndisponiveisDia(data: Date, quadraId: number ): Promise<number[]>{
    const quadra = await this.quadraRepositorio.findOne(quadraId)
    const horarioIndisponiveis: number[] = []
    
    const dataFim = new Date(data)
    dataFim.setHours(23, 59, 59)
   
    const reserva = await this.reservaRepositorio.find({
        where: {
            horario: Between(data, dataFim),
            quadra
        }
    })

    for(let i = 0;  i < reserva.length; i++) {
        const disponivel = await this.verificarDataDisponivel(reserva[i].horario, quadraId);
        if(!disponivel) {
            let hora = reserva[i].horario.getHours()
            if(!horarioIndisponiveis.includes(hora)){
             horarioIndisponiveis.push(hora)
                
           }
        }
    }

    return horarioIndisponiveis
}
  async reservasUsuarioDia(data: Date,  usuarioId: string, quadraId?: number): Promise<ReservaQuadra[]> {
      if(quadraId){

          const quadra = await this.quadraRepositorio.findOne(quadraId)
          const usuario = await this.usuarioRepositorio.findOne(usuarioId)
          const dataFim = new Date(data)
          dataFim.setHours(23, 59, 59)
         
          const reserva = await this.reservaRepositorio.find({
              where: {
                  horario: Between(data, dataFim),
                  quadra,
                  usuario
              }
          })
      
          return reserva
      }
   
      const usuario = await this.usuarioRepositorio.findOne(usuarioId)
      const dataFim = new Date(data)
      dataFim.setHours(23, 59, 59)
     
      const reserva = await this.reservaRepositorio.find({
          where: {
              horario: Between(data, dataFim),
            
              usuario
          }
      })
  
      return reserva

  }

 async buscarReservasDia(data: Date): Promise<ReservaQuadra[]> {
    const dataFim = new Date(data)
    dataFim.setHours(23, 59, 59)
   
    const reserva = await this.reservaRepositorio.find({
        order: {
            horario: 'ASC', 
            quadra:  'ASC'
        },
        where: {
            horario: Between(data, dataFim),
        
        }
    })

    return reserva
  }
}