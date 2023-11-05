import { Router } from "express"

import { register, login, getAppoitments, getAllTattooArtists, remove } from "../controller/tattooArtistController"

import { auth } from "../middlewares/authMiddleware"
import { admin } from "../middlewares/adminMiddleware"

const router = Router()

router.post("/register", auth, admin, register)
router.post("/login", login)
router.get("/getAppoitments", auth, getAppoitments)
router.get("/getAllTattooArtists", getAllTattooArtists)
router.delete("/remove", auth, admin, remove)

export default router