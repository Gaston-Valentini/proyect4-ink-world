import "reflect-metadata"
import { DataSource } from "typeorm"

export const database = new DataSource({
    type: "mysql",
    host: "",
    port: 0,
    username: "",
    password: "",
    database: "",
    entities: [],
    synchronize: false,
    logging: false,
})