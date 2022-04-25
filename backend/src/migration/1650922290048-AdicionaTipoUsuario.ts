import {MigrationInterface, QueryRunner} from "typeorm";

export class AdicionaTipoUsuario1650922290048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO tipo_usuario(id, name) values(1, 'admin')`)
        await queryRunner.query(`INSERT INTO tipo_usuario(id, name) values(2, 'client')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM tipo_usuario WHERE id = 1)`);
        await queryRunner.query(`DELETE FROM tipo_usuario WHERE id = 2)`);
    
    }

}
