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
exports.getAppoitmentDetails = exports.remove = exports.update = exports.create = void 0;
const Appoitments_1 = require("../entities/Appoitments");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientId = req.token.id;
        const { tattooArtistId, date, type, price, duration } = req.body;
        const appoitmentFound = yield Appoitments_1.Appoitments.findOne({ where: { date } });
        if (appoitmentFound) {
            return res.status(200).json({
                success: true,
                message: "Invalid date"
            });
        }
        const newAppoitment = yield Appoitments_1.Appoitments.create({
            clientId,
            tattooArtistId,
            date,
            type,
            price,
            duration
        }).save();
        return res.status(200).json({
            success: true,
            message: "Appoitment generated successfully",
            newAppoitment
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
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientId = req.token.id;
        const appoitmentId = parseInt(req.params.id);
        yield Appoitments_1.Appoitments.update({
            id: appoitmentId,
            clientId
        }, req.body);
        const updatedAppoitment = yield Appoitments_1.Appoitments.findOne({
            where: { id: appoitmentId }
        });
        return res.status(200).json({
            success: true,
            message: "Appoitment information updated successfully.",
            updatedAppoitment
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
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientId = req.token.id;
        const appoitmentId = parseInt(req.params.id);
        const appoitmentFound = yield Appoitments_1.Appoitments.findOneBy({ clientId, id: appoitmentId });
        if (appoitmentFound) {
            yield Appoitments_1.Appoitments.remove(appoitmentFound);
            return res.status(200).json({
                success: true,
                message: "Appoitment deleted successfully.",
                appoitmentDeleted: appoitmentFound
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: "You cannot delete a quote that is not yours."
            });
        }
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
const getAppoitmentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const appotment = yield Appoitments_1.Appoitments.findOneBy({ id });
        return res.status(200).json({
            success: true,
            appotment
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
exports.getAppoitmentDetails = getAppoitmentDetails;
