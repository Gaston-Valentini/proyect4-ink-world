import { Router } from "express"

import { appoitmentsCreate } from "../controller/appoitmentsController"

const router = Router()

router.post("/create", appoitmentsCreate)

export default router