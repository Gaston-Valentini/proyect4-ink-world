"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const app_1 = __importDefault(require("../app/app"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                success: true,
                message: "Authentication token is missing."
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: true,
                message: "Authentication token is missing."
            });
        }
        const tokenDecoded = jsonwebtoken_1.default.verify(token, app_1.default.get("JWT_SECRET"));
        req.token = tokenDecoded;
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: true,
            message: "Invalid token."
        });
    }
};
exports.auth = auth;
