"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tattooArtistController_1 = require("../controller/tattooArtistController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const router = (0, express_1.Router)();
router.post("/register", authMiddleware_1.auth, adminMiddleware_1.admin, tattooArtistController_1.register);
router.post("/login", authMiddleware_1.auth, tattooArtistController_1.login);
exports.default = router;
