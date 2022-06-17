import {MigrationInterface, QueryRunner} from "typeorm";

export class CriacaoPagamentoEntity1655486901114 implements MigrationInterface {
    name = 'CriacaoPagamentoEntity1655486901114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pagamento_status_enum" AS ENUM('success', 'pending', 'failure')`);
        await queryRunner.query(`CREATE TABLE "pagamento" ("id" character varying NOT NULL, "status" "public"."pagamento_status_enum" NOT NULL, "valor" integer NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" uuid, CONSTRAINT "PK_ac81e75b741a26f350c5fb1ff20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pagamento" ADD CONSTRAINT "FK_477af253606c18821952e336a07" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pagamento" DROP CONSTRAINT "FK_477af253606c18821952e336a07"`);
        await queryRunner.query(`DROP TABLE "pagamento"`);
        await queryRunner.query(`DROP TYPE "public"."pagamento_status_enum"`);
    }

}
