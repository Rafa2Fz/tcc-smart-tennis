
import { ReservaQuadra } from "entity/ReservaQuadra";
import { Usuario } from "entity/Usuario";

export interface IReservaQuadraRepositorio {
    criar(usuario: Usuario, quadraId: number, horarioReserva: Date, personal: boolean): Promise<ReservaQuadra>;
    salvar(reservaQuadra: ReservaQuadra): Promise<ReservaQuadra>
    encontrarReservas(data: Date, quadraId: number): Promise<[ReservaQuadra[], number]>
    verificarDataDisponivel(data: Date, quadraId: number): Promise<Boolean>
    // quantidadeReservasPorHora()
    verificarReservaUsuario(data: Date, usuario:Usuario): Promise<ReservaQuadra | undefined>

    verificarReservaPorDia(data: Date): Promise<ReservaQuadra | undefined>
    
}