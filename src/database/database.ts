import "reflect-metadata"
import { DataSource } from "typeorm"
import app from "../app/app"

import { Clients1698688727173 } from "../migrations/1698688727173-clients"

export const database = new DataSource({
    type: "mysql",
    host: app.get("DB_HOST"),
    port: app.get("DB_PORT"),
    username: app.get("DB_USERNAME"),
    password: app.get("DB_PASSWORD"),
    database: app.get("DB_NAME"),
    migrations: [Clients1698688727173],
    entities: [],
    synchronize: false,
    logging: false,
})