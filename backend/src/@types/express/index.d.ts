import { IUsuarioDTO } from "modules/usuario/dto/IUsuarioDTO";

declare global {
    namespace Express {
        interface Request {
            usuario: IUsuarioDTO
        }
    }

}