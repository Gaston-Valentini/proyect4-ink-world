"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const database_1 = require("./database/database");
const startApp = () => {
    database_1.database.initialize()
        .then(() => {
        console.log("Connected to database");
        try {
            app_1.default.listen(3000, () => {
                console.log(`Server listening on port ${app_1.default.get("SERVER_PORT")}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    })
        .catch(error => console.log(error));
};
startApp();
