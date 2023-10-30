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
        try {
            app_1.default.listen(3000, () => {
                console.log("Ready");
            });
        }
        catch (error) {
            console.log(error);
        }
    })
        .catch(error => console.log(error));
};
startApp();
