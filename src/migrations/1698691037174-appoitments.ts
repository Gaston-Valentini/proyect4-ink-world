import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Appoitments1698691037174 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appoitments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "clientId",
                        type: "int"
                    },
                    {
                        name: "tattooArtistId",
                        type: "int"
                    },
                    {
                        name: "date",
                        type: "timestamp"
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: ["tattoo", "piercing"]
                    },
                    {
                        name: "price",
                        type: "int"
                    },
                    {
                        name: "duration",
                        type: "int"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["clientId"],
                        referencedTableName: "clients",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames: ["tattooArtistId"],
                        referencedTableName: "tattooArtists",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appoitments");
    }

}
