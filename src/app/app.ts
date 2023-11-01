// Imports
import express from "express"
const app = express()

import dotenv from "dotenv"
dotenv.config()

import authRouter from "../views/authRouter"
import clientRouter from "../views/clientRouter"
import appoitmentsRouter from "../views/appoitmentsRouter"

// Settings
app.set("SERVER_PORT", process.env.SERVER_PORT)
app.set("DB_HOST", process.env.DB_HOST)
app.set("DB_PORT", process.env.DB_PORT)
app.set("DB_USERNAME", process.env.DB_USERNAME)
app.set("DB_PASSWORD", process.env.DB_PASSWORD)
app.set("DB_NAME", process.env.DB_NAME)
app.set("JWT_SECRET", process.env.JWT_SECRET)

// Middlewares
app.use(express.json())

// Views
app.use("/auth", authRouter)
app.use("/client", clientRouter)
app.use("/appoitments", appoitmentsRouter)

// Export
export default app