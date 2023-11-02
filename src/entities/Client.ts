import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Appoitments } from "./Appoitments"

@Entity("clients")
export class Client extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    name!: string

    @Column()
    surname!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    phone!: number

    @Column()
    createdAt!: Date

    @Column()
    updatedAt!: Date

    @Column()
    role!: string

    @Column()
    isActive!: boolean

    @OneToMany(() => Appoitments, (appointment) => appointment.client)
    appoitments!: Appoitments[];

}
