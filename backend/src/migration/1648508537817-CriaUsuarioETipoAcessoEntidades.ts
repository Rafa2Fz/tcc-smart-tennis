import {MigrationInterface, QueryRunner} from "typeorm";

export class CriaUsuarioETipoAcessoEntidades1648508537817 implements MigrationInterface {
    name = 'CriaUsuarioETipoAcessoEntidades1648508537817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_usuario" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_2abd2759a18236cbf357c06dea0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "tipoUsuarioId" integer, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_839a74b9952fd140d2c957e9e44" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tipo_usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_839a74b9952fd140d2c957e9e44"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "tipo_usuario"`);
    }

}
