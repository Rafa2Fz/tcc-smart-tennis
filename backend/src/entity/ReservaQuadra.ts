import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quadra } from "./Quadra";
import { Usuario } from "./Usuario";

@Entity('reserva_quadra')
export class ReservaQuadra {

    @PrimaryGeneratedColumn()
    public id: number

    @Column({ type: "timestamp with time zone", nullable: false })
    public horario: Date

    @Column({ type: 'boolean' })
    public personal: Boolean

    @ManyToOne(() => Quadra, quadra => quadra.reservaQuadra, { eager: true, nullable: false})
    public quadra: Quadra

    @ManyToOne(() => Usuario, usuario => usuario.reservaQuadra, { eager: true, nullable: false })
    public usuario: Usuario
}