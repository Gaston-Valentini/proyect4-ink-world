import { Router } from "express"

import { auth } from "../middlewares/authMiddleware" 
import { create, update, remove } from "../controller/appoitmentsController"

const router = Router()

router.post("/create", auth, create)
router.post("/update/:id", auth, update)
router.delete("/remove/:id", auth, remove)

export default router