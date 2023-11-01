import { Router } from "express"

import { auth } from "../middlewares/authMiddleware" 
import { appoitmentsCreate } from "../controller/appoitmentsController"

const router = Router()

router.post("/create", auth, appoitmentsCreate)

export default router