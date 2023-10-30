"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.database = new typeorm_1.DataSource({
    type: "mysql",
    host: "",
    port: 0,
    username: "",
    password: "",
    database: "",
    entities: [],
    synchronize: false,
    logging: false,
});
