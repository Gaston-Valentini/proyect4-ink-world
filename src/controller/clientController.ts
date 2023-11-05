import { Request, Response } from "express"
import bcrypt from "bcrypt"
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

        if (req.body.password) {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10)
            req.body.password = hashedPassword
        }

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

const getAppoitments = async (req:Request, res:Response) => {

    try {

        const id = req.token.id

        const clientFound = await Client.findOne({where: {id}, relations: ["appoitments"]});
        console.log(clientFound);
        
        const appointments = clientFound?.appoitments

        return res.status(200).json({
            success: true,
            appointments
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        })
    }

}

const getAllClients = async (req:Request, res:Response) => {

    try {

        const clientsFound = await Client.find();

        return res.status(200).json({
            success: true,
            clientsFound
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

        const { id } = req.body

        await Client.delete({id});

        return res.status(200).json({
            success: true,
            message: "Client deleted successfully"
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
    update,
    getAppoitments,
    getAllClients,
    remove
}