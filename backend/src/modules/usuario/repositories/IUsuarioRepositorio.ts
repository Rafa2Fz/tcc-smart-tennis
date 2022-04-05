import { Usuario } from "entity/Usuario";

export interface IUsuarioRepositorio {
    criar(usuario: Pick<Usuario, "email" | "nome" | "password" | "tipoUsuarioId">): Promise<Usuario>
    salvar(usuario: Usuario): Promise<Usuario>
    buscarPorEmail(email: string): Promise<Usuario | undefined>
    buscarPorId(id: string): Promise<Usuario | undefined>
    atualizarCreditoUsuario(usuario: Usuario): Promise<Usuario>
}