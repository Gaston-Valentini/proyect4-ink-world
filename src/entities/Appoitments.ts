import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn   } from "typeorm"
import { Client } from "./Client"

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

    @ManyToOne(() => Client, (client) => client.appoitments)
    @JoinColumn({ name: "clientId" })
    client!: Client;

}
