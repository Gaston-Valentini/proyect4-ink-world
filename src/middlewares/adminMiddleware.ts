import { Request, Response, NextFunction } from "express"

export const admin = (req:Request, res:Response, next:NextFunction) => {

    try {

        if (req.token.role !== "admin") {
            return res.status(400).json({
                success: true,
                message: "Access denied."
            })
        }
        next()
        
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: "Invalid token."
        })
    }

}