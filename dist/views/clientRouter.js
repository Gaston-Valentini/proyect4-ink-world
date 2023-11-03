"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controller/clientController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const router = (0, express_1.Router)();
router.get("/profile", authMiddleware_1.auth, clientController_1.profile);
router.post("/update", authMiddleware_1.auth, clientController_1.update);
router.get("/getAppoitments", authMiddleware_1.auth, clientController_1.getAppoitments);
router.get("/getAllClients", authMiddleware_1.auth, adminMiddleware_1.admin, clientController_1.getAllClients);
exports.default = router;
