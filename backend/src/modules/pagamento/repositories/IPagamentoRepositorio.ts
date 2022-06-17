import { Pagamento } from "entity/Pagamento";
import { Usuario } from "entity/Usuario";

export interface IPagamentoRepositorio {
    criar(usuario: Usuario, pagamentoId: string, total: number ): Promise<Pagamento>
    salvar(pagamento: Pagamento): Promise<Pagamento>;

}