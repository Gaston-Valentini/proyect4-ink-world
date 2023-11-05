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
exports.remove = exports.getAllTattooArtists = exports.getAppoitments = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../app/app"));
const TattooArtist_1 = require("../entities/TattooArtist");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickname, name, surname, email, password, phone } = req.body;
        const tattooArtistFound = yield TattooArtist_1.TattooArtist.findOneBy({ email });
        if (tattooArtistFound) {
            return res.status(200).json({
                success: true,
                message: "A tattooArtist is already registered with that email address."
            });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const tattooArtistRegistered = yield TattooArtist_1.TattooArtist.create({
            nickname,
            name,
            surname,
            email,
            password: hashedPassword,
            phone
        }).save();
        return res.status(200).json({
            success: true,
            message: "Tattoo artist registered successfully",
            clientRegistered: {
                nickname: tattooArtistRegistered.nickname,
                name: tattooArtistRegistered.name,
                surname: tattooArtistRegistered.surname,
                email: tattooArtistRegistered.email,
                phone: tattooArtistRegistered.phone
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
        const tattooArtistFound = yield TattooArtist_1.TattooArtist.findOneBy({ email });
        if (!tattooArtistFound) {
            return res.status(200).json({
                success: true,
                message: "There is no registered user with that email address."
            });
        }
        const unhashedPassword = bcrypt_1.default.compareSync(password, tattooArtistFound.password);
        if (!unhashedPassword) {
            return res.status(200).json({
                success: true,
                message: "Incorrect password."
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: tattooArtistFound.id,
            role: tattooArtistFound.role
        }, app_1.default.get("JWT_SECRET"), {
            expiresIn: "24h"
        });
        return res.status(200).json({
            success: true,
            clientFound: {
                nickname: tattooArtistFound.nickname,
                name: tattooArtistFound.name,
                surname: tattooArtistFound.surname,
                email: tattooArtistFound.email,
                phone: tattooArtistFound.phone
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
const getAppoitments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.token.id;
        const tattooArtistFound = yield TattooArtist_1.TattooArtist.findOne({ where: { id }, relations: ["appoitments"] });
        const appointments = tattooArtistFound === null || tattooArtistFound === void 0 ? void 0 : tattooArtistFound.appoitments;
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
const getAllTattooArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tattooArtistsFound = yield TattooArtist_1.TattooArtist.find();
        return res.status(200).json({
            success: true,
            tattooArtistsFound
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
exports.getAllTattooArtists = getAllTattooArtists;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield TattooArtist_1.TattooArtist.delete({ id });
        return res.status(200).json({
            success: true,
            message: "Tattoo artist deleted successfully"
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
