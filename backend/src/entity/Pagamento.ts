import {
  Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn,
} from 'typeorm';
import { Usuario } from './Usuario';

export enum Status {
    SUCCESS = 'success',
    PENDING = 'pending',
    FAILURE = 'failure',
}

@Entity()
export class Pagamento {
    @Column({ primary: true })
      id: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.pagamentos, { eager: true })
      usuario: Usuario;

    @Column({ type: 'enum', enum: Status, nullable: false })
      status: string;

    @Column({ nullable: false })
      valor: number;

    @CreateDateColumn()
      created_At: Date;

    @UpdateDateColumn()
      updated_At: Date;
}
