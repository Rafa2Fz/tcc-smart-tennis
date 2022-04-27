import {MigrationInterface, QueryRunner} from "typeorm";

export class AdicionadoQuadraTipoEAlteradoAtributoQuadraParaNullableFalseDaEntidadeReservaQuadra1651097935197 implements MigrationInterface {
    name = 'AdicionadoQuadraTipoEAlteradoAtributoQuadraParaNullableFalseDaEntidadeReservaQuadra1651097935197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quadra" ADD "tipo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" DROP CONSTRAINT "FK_7b0d5b132e2e9191f75532a8d62"`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" DROP CONSTRAINT "FK_c44586c9f8df69bb01a6809a035"`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ALTER COLUMN "quadraId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ALTER COLUMN "usuarioId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ADD CONSTRAINT "FK_7b0d5b132e2e9191f75532a8d62" FOREIGN KEY ("quadraId") REFERENCES "quadra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ADD CONSTRAINT "FK_c44586c9f8df69bb01a6809a035" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_quadra" DROP CONSTRAINT "FK_c44586c9f8df69bb01a6809a035"`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" DROP CONSTRAINT "FK_7b0d5b132e2e9191f75532a8d62"`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ALTER COLUMN "usuarioId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ALTER COLUMN "quadraId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ADD CONSTRAINT "FK_c44586c9f8df69bb01a6809a035" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ADD CONSTRAINT "FK_7b0d5b132e2e9191f75532a8d62" FOREIGN KEY ("quadraId") REFERENCES "quadra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quadra" DROP COLUMN "tipo"`);
    }

}
