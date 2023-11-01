import { Request, Response, NextFunction } from "express"
import app from "../app/app"
import jwt from "jsonwebtoken"
import { TokenDecoded } from "../types/index"

export const auth = (req:Request, res:Response, next:NextFunction) => {

    try {

        if (!req.headers.authorization) {
            return res.status(400).json({
                success: true,
                message: "Authentication token is missing."
            })
        }
    
        const token = req.headers.authorization.split(' ')[1];
    
        if (!token) {
            return res.status(400).json({
                success: true,
                message: "Authentication token is missing."
            })
        }
        
        const tokenDecoded = jwt.verify(token, app.get("JWT_SECRET")) as TokenDecoded
    
        req.token = tokenDecoded
        next()
        
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: "Invalid token."
        })
    }

}