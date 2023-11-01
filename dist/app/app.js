"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRouter_1 = __importDefault(require("../views/authRouter"));
const clientRouter_1 = __importDefault(require("../views/clientRouter"));
const appoitmentsRouter_1 = __importDefault(require("../views/appoitmentsRouter"));
// Settings
app.set("SERVER_PORT", process.env.SERVER_PORT);
app.set("DB_HOST", process.env.DB_HOST);
app.set("DB_PORT", process.env.DB_PORT);
app.set("DB_USERNAME", process.env.DB_USERNAME);
app.set("DB_PASSWORD", process.env.DB_PASSWORD);
app.set("DB_NAME", process.env.DB_NAME);
app.set("JWT_SECRET", process.env.JWT_SECRET);
// Middlewares
app.use(express_1.default.json());
// Views
app.use("/auth", authRouter_1.default);
app.use("/client", clientRouter_1.default);
app.use("/appoitments", appoitmentsRouter_1.default);
// Export
exports.default = app;
