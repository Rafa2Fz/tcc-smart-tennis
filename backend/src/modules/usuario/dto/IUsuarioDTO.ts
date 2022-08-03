import { TipoUsuario } from 'entity/TipoUsuario';

export interface IUsuarioDTO {
    id?: string;
    nome: string;
    email: string;
    tipoUsuario: TipoUsuario;
    credito?: number;
    avatar_url: string;
}
