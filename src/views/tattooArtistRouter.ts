import { Router } from "express"

import { register, login, getAppoitments, getAllTattooArtists } from "../controller/tattooArtistController"

import { auth } from "../middlewares/authMiddleware"
import { admin } from "../middlewares/adminMiddleware"

const router = Router()

router.post("/register", auth, admin, register)
router.post("/login", auth, login)
router.get("/getAppoitments", auth, getAppoitments)
router.get("/getAllTattooArtists", getAllTattooArtists)

export default router