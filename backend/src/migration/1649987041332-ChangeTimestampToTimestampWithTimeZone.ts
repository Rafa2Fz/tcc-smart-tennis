import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTimestampToTimestampWithTimeZone1649987041332 implements MigrationInterface {
    name = 'ChangeTimestampToTimestampWithTimeZone1649987041332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_quadra" DROP COLUMN "horario"`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ADD "horario" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_quadra" DROP COLUMN "horario"`);
        await queryRunner.query(`ALTER TABLE "reserva_quadra" ADD "horario" TIMESTAMP NOT NULL`);
    }

}
