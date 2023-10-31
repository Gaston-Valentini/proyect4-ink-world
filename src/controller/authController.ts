import { Request, Response } from "express"
import bcrypt from "bcrypt"

import { Client } from "../entities/Client"

const register = async (req:Request, res:Response) => {
    try {

        const { name, surname, email, password, phone } = req.body

        const clientFound = await Client.findOneBy({email})

        if (clientFound) {
            return res.status(200).json({
                success: true,
                message: "A client is already registered with that email address."
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const clientRegistered = await Client.create({
            name,
            surname,
            email,
            password: hashedPassword,
            phone
        }).save()

        return res.status(200).json({
            success: true,
            message: "Client registered successfully",
            clientRegistered: {
                name: clientRegistered.name,
                surname: clientRegistered.surname,
                email: clientRegistered.email,
                phone: clientRegistered.phone
            }
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
    register
}