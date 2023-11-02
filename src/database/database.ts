import "reflect-metadata"
import { DataSource } from "typeorm"
import app from "../app/app"

import { Clients1698688727173 } from "../migrations/1698688727173-clients"
import { TattooArtists1698689882718 } from "../migrations/1698689882718-tattooArtists"
import { Appoitments1698691037174 } from "../migrations/1698691037174-appoitments"
import { Portfolio1698692305762 } from "../migrations/1698692305762-portfolio"
import { Client } from "../entities/Client"
import { Appoitments } from "../entities/Appoitments"
import { TattooArtist } from "../entities/TattooArtist"

export const database = new DataSource({
    type: "mysql",
    host: app.get("DB_HOST"),
    port: app.get("DB_PORT"),
    username: app.get("DB_USERNAME"),
    password: app.get("DB_PASSWORD"),
    database: app.get("DB_NAME"),
    migrations: [
        Clients1698688727173,
        TattooArtists1698689882718,
        Appoitments1698691037174,
        Portfolio1698692305762
    ],
    entities: [
        Client,
        Appoitments,
        TattooArtist
    ],
    synchronize: false,
    logging: false,
})