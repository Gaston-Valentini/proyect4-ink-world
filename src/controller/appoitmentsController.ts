import { Request, Response } from "express"

import { Appoitments } from "../entities/Appoitments"

const create = async (req:Request, res:Response) => {

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

const update = async (req:Request, res:Response) => {

    try {

        const clientId = req.token.id
        const appoitmentId = parseInt(req.params.id)

        await Appoitments.update(
            {
                id: appoitmentId,
                clientId
            },
            req.body
        )

        const updatedAppoitment = await Appoitments.findOne({
            where: {id: appoitmentId}
        })

        return res.status(200).json({
            success: true,
            message: "Appoitment information updated successfully.",
            updatedAppoitment
        })
        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        })
    }
    
}

const remove = async (req:Request, res:Response) => {

    try {

        const clientId = req.token.id
        const appoitmentId = parseInt(req.params.id)

        const appoitmentFound = await Appoitments.findOneBy({clientId, id: appoitmentId})

        if (appoitmentFound) {
            await Appoitments.remove(appoitmentFound)
            return res.status(200).json({
                success: true,
                message: "Appoitment deleted successfully.",
                appoitmentDeleted: appoitmentFound
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "You cannot delete a quote that is not yours."
            })
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        })
    }
    
}

const getAppoitmentDetails = async (req:Request, res:Response) => {

    try {

        const id = parseInt(req.params.id)

        const appotment = await Appoitments.findOneBy({id})

        return res.status(200).json({
            success: true,
            appotment
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
    create,
    update,
    remove,
    getAppoitmentDetails
}