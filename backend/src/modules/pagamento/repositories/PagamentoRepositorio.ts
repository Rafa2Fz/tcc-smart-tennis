import { Pagamento } from "entity/Pagamento";
import { Usuario } from "entity/Usuario";
import { getRepository, Repository } from "typeorm";
import { IPagamentoRepositorio } from "./IPagamentoRepositorio";

export class PagamentoRepositorio implements IPagamentoRepositorio {

    private pagamentoRepositorio: Repository<Pagamento>
    constructor(){
        this.pagamentoRepositorio = getRepository(Pagamento)
    }
    async criar(usuario: Usuario, pagamentoId: string, total: number): Promise<Pagamento> {
        const pagamento =  this.pagamentoRepositorio.create({id: pagamentoId, status: 'pending', valor: total, usuario})

        return pagamento
    }
   async  salvar(pagamento: Pagamento): Promise<Pagamento> {
        const pagamentoSalvo = await this.pagamentoRepositorio.save(pagamento) 

        return pagamentoSalvo
    }
}