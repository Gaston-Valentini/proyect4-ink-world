import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TattooArtists1698689882718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tattooArtists",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nickname",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "surname",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "phone",
                        type: "int"
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["admin", "tattooArtist"],
                        default: "'tattooArtist'"
                    },
                    {
                        name: "isActive",
                        type: "boolean",
                        default: true
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tattooArtists");
    }

}
