import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReservaQuadra } from "./ReservaQuadra";

@Entity()
export class Quadra {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => ReservaQuadra, reservaQuadra => reservaQuadra.quadra)
    public reservaQuadra: ReservaQuadra[]
}