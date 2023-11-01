import { Request, Response } from "express"
import { Client } from "../entities/Client"

const profile = async (req:Request, res:Response) => {

    try {

        const client = req.token

        const clientFound = await Client.findOne({
            where: {id: client.id},
            select: [
                "id",
                "name",
                "surname",
                "email",
                "phone"
            ]
        })

        return res.status(200).json({
            success: true,
            clientFound
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

        const id = req.token.id

        await Client.update(
            {id},
            req.body
        )

        const updatedClient = await Client.findOne({
            where: {id},
            select: [
                "id",
                "name",
                "surname",
                "email",
                "phone"
            ]
        })

        return res.status(200).json({
            success: true,
            message: "Client information updated successfully.",
            updatedClient
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
    profile,
    update
}