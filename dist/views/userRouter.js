"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/profile", authMiddleware_1.auth, userController_1.profile);
router.post("/update", authMiddleware_1.auth, userController_1.update);
exports.default = router;
