import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTiposQuadra1651098423658 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO quadra(id, tipo) values(1, 'aula')`)
        await queryRunner.query(`INSERT INTO quadra(id, tipo) values(2, 'aluguel')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM quadra WHERE id = 1`);
        await queryRunner.query(`DELETE FROM quadra WHERE id = 2`);
    }

}
