import {MigrationInterface, QueryRunner} from "typeorm";

export class AdicionadoCreditoAtributo1649008816547 implements MigrationInterface {
    name = 'AdicionadoCreditoAtributo1649008816547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "credito" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "credito"`);
    }

}
