import {MigrationInterface, QueryRunner} from "typeorm";

export class CriaQuadraEReservaQuadraEntidades1648773488501 implements MigrationInterface {
    name = 'CriaQuadraEReservaQuadraEntidades1648773488501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quadra" ("id" SERIAL NOT NULL, CONSTRAINT "PK_488dbc852c932ae37243f43727c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reserva_quadra" ("id" SERIAL NOT NULL, "horario" TIMESTAMP NOT NULL, "personal" boolean NOT NULL, "quadraId" integer, "usuarioId" uuid, CONSTRAINT "PK_c63b58fb2bdede1d56e50fc5294" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ADD CONSTRAINT "FK_7b0d5b132e2e9191f75532a8d62" FOREIGN KEY ("quadraId") REFERENCES "quadra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ADD CONSTRAINT "FK_c44586c9f8df69bb01a6809a035" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_quadra" DROP CONSTRAINT "FK_c44586c9f8df69bb01a6809a035"`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" DROP CONSTRAINT "FK_7b0d5b132e2e9191f75532a8d62"`);
        await queryRunner.query(`DROP TABLE "reserva_quadra"`);
        await queryRunner.query(`DROP TABLE "quadra"`);
    }

}
