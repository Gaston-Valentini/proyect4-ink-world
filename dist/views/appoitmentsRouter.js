"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appoitmentsController_1 = require("../controller/appoitmentsController");
const router = (0, express_1.Router)();
router.post("/create", appoitmentsController_1.appoitmentsCreate);
exports.default = router;
