import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("appoitments")
export class Appoitments extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    clientId!: number

    @Column()
    tattooArtistId!: number

    @Column()
    date!: Date

    @Column()
    type!: string

    @Column()
    price!: number

    @Column()
    duration!: number

}
