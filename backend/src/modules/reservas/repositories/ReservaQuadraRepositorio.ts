import { IReservaQuadraRepositorio } from "./IReservaQuadraRepositorio";

import { Between, getRepository, Repository } from "typeorm";
import { Usuario } from "entity/Usuario";
import { ReservaQuadra } from "entity/ReservaQuadra";
import { Quadra } from "entity/Quadra";
import { Folga } from "entity/Folga";



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
}