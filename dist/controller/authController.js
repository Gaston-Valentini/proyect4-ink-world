"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.profile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../app/app"));
const Client_1 = require("../entities/Client");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, surname, email, password, phone } = req.body;
        const clientFound = yield Client_1.Client.findOneBy({ email });
        if (clientFound) {
            return res.status(200).json({
                success: true,
                message: "A client is already registered with that email address."
            });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const clientRegistered = yield Client_1.Client.create({
            name,
            surname,
            email,
            password: hashedPassword,
            phone
        }).save();
        return res.status(200).json({
            success: true,
            message: "Client registered successfully",
            clientRegistered: {
                name: clientRegistered.name,
                surname: clientRegistered.surname,
                email: clientRegistered.email,
                phone: clientRegistered.phone
            }
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const clientFound = yield Client_1.Client.findOneBy({ email });
        if (!clientFound) {
            return res.status(200).json({
                success: true,
                message: "There is no registered user with that email address."
            });
        }
        const unhashedPassword = bcrypt_1.default.compareSync(password, clientFound.password);
        if (!unhashedPassword) {
            return res.status(200).json({
                success: true,
                message: "Incorrect password."
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: clientFound.id,
            role: clientFound.role
        }, app_1.default.get("JWT_SECRET"), {
            expiresIn: "24h"
        });
        return res.status(200).json({
            success: true,
            message: "Client registered successfully",
            clientFound: {
                name: clientFound.name,
                surname: clientFound.surname,
                email: clientFound.email,
                phone: clientFound.phone
            },
            token
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        });
    }
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = req.token;
        const clientFound = yield Client_1.Client.findOneBy({ id: client.id });
        return res.status(200).json({
            success: true,
            client: {
                name: clientFound === null || clientFound === void 0 ? void 0 : clientFound.name,
                surname: clientFound === null || clientFound === void 0 ? void 0 : clientFound.surname,
                email: clientFound === null || clientFound === void 0 ? void 0 : clientFound.email,
                phone: clientFound === null || clientFound === void 0 ? void 0 : clientFound.phone
            }
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        });
    }
});
exports.profile = profile;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.token.id;
        yield Client_1.Client.update({ id }, req.body);
        const updatedClient = yield Client_1.Client.findOne({
            where: { id },
            select: [
                "id",
                "name",
                "surname",
                "email",
                "phone"
            ]
        });
        return res.status(200).json({
            success: true,
            message: "Client information updated successfully.",
            updatedClient
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        });
    }
});
exports.update = update;
