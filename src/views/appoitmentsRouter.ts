import { Router } from "express"

import { auth } from "../middlewares/authMiddleware" 
import { create, update } from "../controller/appoitmentsController"

const router = Router()

router.post("/create", auth, create)
router.post("/update/:id", auth, update)

export default router