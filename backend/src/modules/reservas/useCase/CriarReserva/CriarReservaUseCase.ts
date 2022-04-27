import { isPast } from "date-fns";
import { IFolgaRepositorio } from "modules/folga/repositories/IFolgaRepositorio";
import { IReservaQuadraRepositorio } from "modules/reservas/repositories/IReservaQuadraRepositorio";
import { IUsuarioRepositorio } from "modules/usuario/repositories/IUsuarioRepositorio";
import { AppError } from "shared/error/AppError";
import { inject, injectable } from "tsyringe";

export interface IDataRequest {
    usuarioId: string,
    quadraId: number,
    horario: {
        ano: number,
        mes: number,
        dia: number,
        hora: number
    },
    personal: boolean

}

@injectable()
export class CriarReservaUseCase {

    constructor(
        @inject('UsuarioRepositorio')
        private usuarioRepositorio: IUsuarioRepositorio,
        @inject('ReservaQuadraRepositorio')
        private reservaQuadraRepositorio: IReservaQuadraRepositorio,
        @inject('FolgaRepositorio')
        private folgaRepositorio: IFolgaRepositorio

    ) { }

    public async execute({ usuarioId, quadraId, personal, horario }: IDataRequest) {
        
        if(quadraId === 1) {
            personal = true
        }

        const expedienteDia =[1, 2, 3, 4, 5]
        const expedienteHora =[6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17]

        const usuario = await this.usuarioRepositorio.buscarPorId(usuarioId)

        const { ano, mes, dia, hora } = horario

        if (!usuario) {
            throw new AppError('Usuário não encontrado', 400)
        }

        const reservaData = new Date(ano, mes, dia, hora)
        const folgaData = new Date(ano, mes, dia)

        if(isPast(reservaData)) {
            throw new AppError('Não pode fazer reserva para uma data que já passou', 400)
        }
        
        if(!expedienteDia.includes(reservaData.getDay())) {
            throw new AppError('Data indisponível para reserva (Sábado/Domingo)', 400)
        }
        
        if(!expedienteHora.includes(reservaData.getHours())){
            throw new AppError('Não é possivel fazer reserva para este horário', 400)
        }
        const existeFolga = await this.folgaRepositorio.verificarFolga(folgaData)
        
        if(existeFolga) {
            throw new AppError('Esta data não está disponivel para reserva', 400)
        }

        const usuarioPossuiReserva = await this.reservaQuadraRepositorio.verificarReservaUsuario(reservaData, usuario)

        if(usuarioPossuiReserva) {
            throw new AppError('Já possui uma reserva para este horário', 400)
        }
        const disponivel = await this.reservaQuadraRepositorio.verificarDataDisponivel(reservaData, quadraId)

        if (!disponivel) {
            throw new AppError('Atingiu o número máximo de reservas para o horário desejado', 400)
        }

        const reservaCriada = await this.reservaQuadraRepositorio.criar(usuario, quadraId, reservaData, personal)

        await usuario.debitarCredito(1)

        await this.usuarioRepositorio.atualizarCreditoUsuario(usuario)

        await this.reservaQuadraRepositorio.salvar(reservaCriada)

        return reservaCriada
    }
}