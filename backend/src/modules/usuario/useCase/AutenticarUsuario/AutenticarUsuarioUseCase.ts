import { IUsuarioDTO } from "modules/usuario/dto/IUsuarioDTO";
import { IUsuarioRepositorio } from "modules/usuario/repositories/IUsuarioRepositorio";
import { IHashProvider } from "shared/container/providers/HashProvider/IHashProvider";
import { iJsonWebToken } from "shared/container/providers/JsonWebToken/IJsonWebToken";
import { AppError } from "shared/error/AppError";
import { inject, injectable } from "tsyringe";

interface Request {
    email: string;
    password: string;
}

@injectable()
export class AutenticarUsuario {

    constructor(
        @inject('UsuarioRepositorio')
        private usuarioRepositorio: IUsuarioRepositorio,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        @inject('JsonWebToken')
        private jsonWebToken: iJsonWebToken
    ) { }

    public async execute({ email, password }: Request): Promise<string> {

        const usuarioExiste = await this.usuarioRepositorio.buscarPorEmail(email)

        if (!usuarioExiste) {
            throw new AppError('Não foi possível encontrar sua conta.', 400)
        }


        const passwordIguais = await this.hashProvider.compare(password, usuarioExiste.password)

        if (!passwordIguais) {
            throw new AppError('Senha incorreta.', 400)
        }

        const creditoUsuario = usuarioExiste.getCredito
        const { id, nome, tipoUsuario } = usuarioExiste
        const token = await this.jsonWebToken.sign<IUsuarioDTO>({
            id,
            nome,
            email,
            tipoUsuario,
            credito: creditoUsuario
        }, id)

        return token
    }
}