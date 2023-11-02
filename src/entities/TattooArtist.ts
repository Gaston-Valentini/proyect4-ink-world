import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("tattooArtists")
export class TattooArtist extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nickname!: string
    
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

}
