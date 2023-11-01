import { Router } from "express"

import { register, login, profile } from "../controller/authController"
import { auth } from "../middlewares/authMiddleware"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile", auth, profile)

export default router