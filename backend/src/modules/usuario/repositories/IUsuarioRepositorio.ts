import { Usuario } from "entity/Usuario";

export interface IUsuarioRepositorio {
    criar(usuario: Omit<Usuario, "id" | "tipoUsuario">): Promise<Usuario>
    salvar(usuario: Usuario): Promise<Usuario>
    buscarPorEmail(id: string): Promise<Usuario | undefined>
}