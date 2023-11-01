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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.profile = void 0;
const Client_1 = require("../entities/Client");
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
