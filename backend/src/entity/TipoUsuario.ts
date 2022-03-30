import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class TipoUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string
}