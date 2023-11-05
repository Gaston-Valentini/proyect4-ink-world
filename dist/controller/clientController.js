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
exports.remove = exports.getAllClients = exports.getAppoitments = exports.update = exports.profile = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Client_1 = require("../entities/Client");
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = req.token;
        const clientFound = yield Client_1.Client.findOne({
            where: { id: client.id },
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
            clientFound
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
        if (req.body.password) {
            const hashedPassword = bcrypt_1.default.hashSync(req.body.password, 10);
            req.body.password = hashedPassword;
        }
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
const getAppoitments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.token.id;
        const clientFound = yield Client_1.Client.findOne({ where: { id }, relations: ["appoitments"] });
        console.log(clientFound);
        const appointments = clientFound === null || clientFound === void 0 ? void 0 : clientFound.appoitments;
        return res.status(200).json({
            success: true,
            appointments
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
exports.getAppoitments = getAppoitments;
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientsFound = yield Client_1.Client.find();
        return res.status(200).json({
            success: true,
            clientsFound
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
exports.getAllClients = getAllClients;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield Client_1.Client.delete({ id });
        return res.status(200).json({
            success: true,
            message: "Client deleted successfully"
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
exports.remove = remove;
