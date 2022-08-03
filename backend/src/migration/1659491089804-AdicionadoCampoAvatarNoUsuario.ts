import {MigrationInterface, QueryRunner} from "typeorm";

export class AdicionadoCampoAvatarNoUsuario1659491089804 implements MigrationInterface {
    name = 'AdicionadoCampoAvatarNoUsuario1659491089804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "avatar"`);
    }

}
