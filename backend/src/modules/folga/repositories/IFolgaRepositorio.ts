import { Folga } from "entity/Folga";

export interface IFolgaRepositorio {
    criar(data: Date): Promise<Folga>
    salvar(folga: Folga): Promise<Folga>
    verificarFolga(data: Date): Promise<Folga | undefined>
    verificarFolgasMes(data: Date): Promise<Folga[]>
}