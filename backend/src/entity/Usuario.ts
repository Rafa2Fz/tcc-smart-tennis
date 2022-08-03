import { AppError } from "shared/error/AppError";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Pagamento } from "./Pagamento";
import { ReservaQuadra } from "./ReservaQuadra";
import { TipoUsuario } from "./TipoUsuario";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public nome: string;

    @Column({ nullable: false, unique: true })
    public email: string;

    @Column({ nullable: false })
    public password: string;

    @Column({ nullable: true, default: 0 })
    private credito: number

    @Column({ nullable: true })
    public avatar: string;

    @ManyToOne(() => TipoUsuario, { eager: true })
    public tipoUsuario: TipoUsuario

    public tipoUsuarioId: number;

    @OneToMany(() => ReservaQuadra, reservaQuadra => reservaQuadra.usuario)
    public reservaQuadra: ReservaQuadra[]

    @OneToMany(() => Pagamento, (pagamento) => pagamento.usuario)
    pagamentos: Pagamento[]

    public async debitarCredito(valor: number) {
        const usuarioCredito = this.getCredito
        if (valor > usuarioCredito) {
            throw new AppError('Crédito insuficiente!', 400)
        }


        this.setCredito = usuarioCredito - valor;
    }

    set setCredito(valor: number) {
        this.credito = valor
    }
    get getCredito() {
        return this.credito
    }

    get avatarUrl() {
        if(this.avatar) {
            return `/usuario/avatar/${this.id}/${this.avatar}`
        } else {
            return null
        }    
    }

    toJSON () {
        delete this.password;
        return this;
}

}
