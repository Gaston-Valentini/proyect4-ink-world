import { Request, Response } from "express"

import { Appoitments } from "../entities/Appoitments"

const appoitmentsCreate = async (req:Request, res:Response) => {

    try {
        
        const clientId =  req.token.id

        const { tattooArtistId, date, type, price, duration } = req.body

        const newAppoitment = await Appoitments.create({
            clientId,
            tattooArtistId,
            date,
            type,
            price,
            duration
        }).save()

        return res.status(200).json({
            success: true,
            message: "Appoitment generated successfully",
            newAppoitment
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        })
    }

}

export {
    appoitmentsCreate
}