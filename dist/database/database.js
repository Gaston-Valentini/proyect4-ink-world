"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("../app/app"));
const _1698688727173_clients_1 = require("../migrations/1698688727173-clients");
const _1698689882718_tattooArtists_1 = require("../migrations/1698689882718-tattooArtists");
const _1698691037174_appoitments_1 = require("../migrations/1698691037174-appoitments");
const _1698692305762_portfolio_1 = require("../migrations/1698692305762-portfolio");
const Client_1 = require("../entities/Client");
exports.database = new typeorm_1.DataSource({
    type: "mysql",
    host: app_1.default.get("DB_HOST"),
    port: app_1.default.get("DB_PORT"),
    username: app_1.default.get("DB_USERNAME"),
    password: app_1.default.get("DB_PASSWORD"),
    database: app_1.default.get("DB_NAME"),
    migrations: [
        _1698688727173_clients_1.Clients1698688727173,
        _1698689882718_tattooArtists_1.TattooArtists1698689882718,
        _1698691037174_appoitments_1.Appoitments1698691037174,
        _1698692305762_portfolio_1.Portfolio1698692305762
    ],
    entities: [
        Client_1.Client
    ],
    synchronize: false,
    logging: false,
});
