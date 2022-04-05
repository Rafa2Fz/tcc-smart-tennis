import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class TipoUsuario {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string
}