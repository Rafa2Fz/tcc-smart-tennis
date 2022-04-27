import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReservaQuadra } from "./ReservaQuadra";

@Entity()
export class Quadra {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public tipo: string

    @OneToMany(() => ReservaQuadra, reservaQuadra => reservaQuadra.quadra)
    public reservaQuadra: ReservaQuadra[]
}