import { Router } from "express"

import { register, login } from "../controller/tattooArtistController"

import { auth } from "../middlewares/authMiddleware"
import { admin } from "../middlewares/adminMiddleware"

const router = Router()

router.post("/register", auth, admin, register)
router.post("/login", auth, login)

export default router