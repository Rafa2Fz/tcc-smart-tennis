import { Usuario } from "entity/Usuario";

import { IUsuarioRepositorio } from "modules/usuario/repositories/IUsuarioRepositorio";
import { AppError } from "shared/error/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    idAdmin: string;
    email: string;
    quantidade: number;
}

@injectable()
export class AdicionaCreditoUsuarioUseCase {
   constructor(
    @inject('UsuarioRepositorio')
    private usuarioRepositorio: IUsuarioRepositorio,
   ){}

   async execute({idAdmin, email, quantidade}: IRequest): Promise<{msg: string, usuario: Usuario}>{
    const admin =  await this.usuarioRepositorio.buscarPorId(idAdmin)
    if(admin.tipoUsuario.name !== 'admin'){
        throw new AppError('Você não possui permissão para realizar essa operação', 401)
    }

    if(typeof quantidade !== 'number'){
        throw new AppError('A quantidade deve ser um valor númerico válido', 400)
    }

    const usuario = await this.usuarioRepositorio.buscarPorEmail(email);

    if(!usuario){
        throw new AppError('Usuário não encontrado', 400)
    }

    const creditoUsuario = usuario.getCredito

    usuario.setCredito = creditoUsuario + quantidade

    await this.usuarioRepositorio.salvar(usuario)

    return {msg: "Crédito adicionado com sucesso!", usuario}
   }
}