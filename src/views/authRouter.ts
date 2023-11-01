import { Router } from "express"

import { register, login, profile, update } from "../controller/authController"
import { auth } from "../middlewares/authMiddleware"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile", auth, profile)
router.post("/update", auth, update)

export default router