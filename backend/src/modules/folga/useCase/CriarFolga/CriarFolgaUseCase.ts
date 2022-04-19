
import { Folga } from "entity/Folga";
import { IFolgaRepositorio } from "modules/folga/repositories/IFolgaRepositorio";
import { IReservaQuadraRepositorio } from "modules/reservas/repositories/IReservaQuadraRepositorio";
import { IUsuarioRepositorio } from "modules/usuario/repositories/IUsuarioRepositorio";
import { AppError } from "shared/error/AppError";
import { inject, injectable } from "tsyringe";

interface Request {
    data: {
        mes: number,
        dia: number
        ano: number
    }
    usuarioId: string
}

@injectable()
export class CriarFolgaUseCase {
    constructor(
        @inject('FolgaRepositorio')
        private folgaRepositorio: IFolgaRepositorio,
        @inject('UsuarioRepositorio')
        private usuarioRepositorio: IUsuarioRepositorio,
        @inject('ReservaQuadraRepositorio')
        private reservaQuadra: IReservaQuadraRepositorio
    ){}
    public async execute({data, usuarioId}:Request): Promise<Folga>{
        const {ano, mes, dia} = data
        const usuario = await this.usuarioRepositorio.buscarPorId(usuarioId)
        const dataFolga = new Date(ano, mes, dia, 0, 0, 0, 0);
       
        

        if(!usuario) {
            throw new AppError('Usuário não encontrado para realizar a requisição', 400)
        }
        
        if(usuario.tipoUsuario.name !== 'admin') {
            throw new AppError('Usuário não possui permissão para realizar essa operação', 401)
        }

        const reserva = await this.reservaQuadra.verificarReservaPorDia(dataFolga)

        
        if(reserva) {
            throw new AppError('Existe reserva para essa data', 401)
        }

        const existeFolga = await this.folgaRepositorio.verificarFolga(dataFolga)

        if(existeFolga){
            throw new AppError('Já existe uma folga para essa data', 401)
        }

        const folga = await this.folgaRepositorio.criar(dataFolga)

        await this.folgaRepositorio.salvar(folga)


        return folga
    
    }
}