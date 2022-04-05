import { AppError } from "shared/error/AppError";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
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

    @ManyToOne(() => TipoUsuario, { eager: true })
    public tipoUsuario: TipoUsuario

    public tipoUsuarioId: number;

    @OneToMany(() => ReservaQuadra, reservaQuadra => reservaQuadra.usuario)
    public reservaQuadra: ReservaQuadra[]

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

}
