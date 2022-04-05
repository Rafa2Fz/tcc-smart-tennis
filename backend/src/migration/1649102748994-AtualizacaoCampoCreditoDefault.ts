import {MigrationInterface, QueryRunner} from "typeorm";

export class AtualizacaoCampoCreditoDefault1649102748994 implements MigrationInterface {
    name = 'AtualizacaoCampoCreditoDefault1649102748994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "credito" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "credito" DROP DEFAULT`);
    }

}
