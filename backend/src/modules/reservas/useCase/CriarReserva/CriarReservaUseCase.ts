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
        private reservaQuadraRepositorio: IReservaQuadraRepositorio

    ) { }

    public async execute({ usuarioId, quadraId, personal, horario }: IDataRequest) {

        const usuario = await this.usuarioRepositorio.buscarPorId(usuarioId)

        const { ano, mes, dia, hora } = horario

        if (!usuario) {
            throw new AppError('Usuário não encontrado!', 500)
        }

        await this.reservaQuadraRepositorio.criar(usuario, quadraId, new Date(), true)

        const reservaData = new Date(ano, mes, dia, hora)

        const disponivel = await this.reservaQuadraRepositorio.verificarDataDisponivel(reservaData, quadraId)

        if (!disponivel) {
            throw new AppError('Atingiu o número máximo de reservas para o horário desejado', 401)
        }

        const reservaCriada = await this.reservaQuadraRepositorio.criar(usuario, quadraId, reservaData, true)

        await usuario.debitarCredito(1)

        await this.usuarioRepositorio.atualizarCreditoUsuario(usuario)

        await this.reservaQuadraRepositorio.salvar(reservaCriada)


        return reservaData
    }
}