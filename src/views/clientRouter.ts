import { Router } from "express"

import { profile, update, getAppoitments, getAllClients, remove } from "../controller/clientController"
import { auth } from "../middlewares/authMiddleware"
import { admin } from "../middlewares/adminMiddleware"

const router = Router()

router.get("/profile", auth, profile)
router.post("/update", auth, update)
router.get("/getAppoitments", auth, getAppoitments)
router.get("/getAllClients", auth, admin, getAllClients)
router.delete("/remove", auth, admin, remove)

export default router