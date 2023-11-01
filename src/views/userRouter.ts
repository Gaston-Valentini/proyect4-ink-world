import { Router } from "express"

import { profile, update } from "../controller/userController"
import { auth } from "../middlewares/authMiddleware"

const router = Router()

router.get("/profile", auth, profile)
router.post("/update", auth, update)

export default router