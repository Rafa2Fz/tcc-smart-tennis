import { Usuario } from "entity/Usuario";

declare global {
    namespace Express {
        interface Request {
            usuario: Omit<Usuario, "password" | "tipoUsuarioId">
        }
    }

}