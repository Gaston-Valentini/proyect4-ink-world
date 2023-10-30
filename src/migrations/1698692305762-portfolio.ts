import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Portfolio1698692305762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "portfolio",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "tattooArtistId",
                        type: "int"
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "style",
                        type: "varchar",
                        length: "255"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["tattooArtistId"],
                        referencedTableName: "tattooArtists",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("portfolio");
    }

}
