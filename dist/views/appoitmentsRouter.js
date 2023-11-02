"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const appoitmentsController_1 = require("../controller/appoitmentsController");
const router = (0, express_1.Router)();
router.post("/create", authMiddleware_1.auth, appoitmentsController_1.create);
router.post("/update/:id", authMiddleware_1.auth, appoitmentsController_1.update);
exports.default = router;
