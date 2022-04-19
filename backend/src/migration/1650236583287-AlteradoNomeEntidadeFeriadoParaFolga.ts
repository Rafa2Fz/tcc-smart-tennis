import {MigrationInterface, QueryRunner} from "typeorm";

export class AlteradoNomeEntidadeFeriadoParaFolga1650236583287 implements MigrationInterface {
    name = 'AlteradoNomeEntidadeFeriadoParaFolga1650236583287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "folga" ("id" SERIAL NOT NULL, "data" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_0dd04bd079c2506d04f43c3e4ee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "folga"`);
    }

}
