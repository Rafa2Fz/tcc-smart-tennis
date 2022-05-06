
import { ReservaQuadra } from "entity/ReservaQuadra";
import { Usuario } from "entity/Usuario";

export interface IReservaQuadraRepositorio {
    criar(usuario: Usuario, quadraId: number, horarioReserva: Date, personal: boolean): Promise<ReservaQuadra>;
    salvar(reservaQuadra: ReservaQuadra): Promise<ReservaQuadra>
    encontrarReservas(data: Date, quadraId: number): Promise<[ReservaQuadra[], number]>
    verificarDataDisponivel(data: Date, quadraId: number): Promise<Boolean>
    verificarReservaUsuario(data: Date, usuario:Usuario): Promise<ReservaQuadra | undefined>
    verificarReservaPorDia(data: Date): Promise<ReservaQuadra | undefined>
    verificarReservasMes(data: Date): Promise<ReservaQuadra[]>
    horariosIndisponiveisDia(data: Date, quadraId: number): Promise<number[]>
    verificarHorarioPersonalDisponivel(data: Date,  quadraId: number): Promise<Boolean>
    reservasUsuarioDia(data: Date,  usuarioId: string, quadraId?: number): Promise<ReservaQuadra[]>
    buscarReservasDia(data: Date): Promise<ReservaQuadra[]>
}