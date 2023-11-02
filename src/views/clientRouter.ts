import { Router } from "express"

import { profile, update, getAppoitments } from "../controller/clientController"
import { auth } from "../middlewares/authMiddleware"

const router = Router()

router.get("/profile", auth, profile)
router.post("/update", auth, update)
router.post("/getAppoitments", auth, getAppoitments)

export default router