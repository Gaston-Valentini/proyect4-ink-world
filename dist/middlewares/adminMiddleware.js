"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const admin = (req, res, next) => {
    try {
        if (req.token.role !== "admin") {
            return res.status(400).json({
                success: true,
                message: "Access denied."
            });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: true,
            message: "Invalid token."
        });
    }
};
exports.admin = admin;
