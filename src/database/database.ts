import "reflect-metadata"
import { DataSource } from "typeorm"
import app from "../app/app"

export const database = new DataSource({
    type: "mysql",
    host: app.get("DB_HOST"),
    port: app.get("DB_PORT"),
    username: app.get("DB_USERNAME"),
    password: app.get("DB_PASSWORD"),
    database: app.get("DB_NAME"),
    entities: [],
    synchronize: false,
    logging: false,
})