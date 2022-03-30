import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TipoUsuario } from "./TipoUsuario";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;


    @ManyToOne(() => TipoUsuario, { eager: true })
    tipoUsuario: TipoUsuario

    tipoUsuarioId: number;
}
