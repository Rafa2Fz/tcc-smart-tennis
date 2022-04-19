import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Folga {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'timestamp with time zone'})
    data: Date;

}