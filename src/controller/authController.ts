import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import app from "../app/app"

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

const login = async (req:Request, res:Response) => {
    try {
        
        const { email, password } = req.body

        const clientFound = await Client.findOneBy({email})

        if (!clientFound) {
            return res.status(200).json({
                success: true,
                message: "There is no registered user with that email address."
            })
        }

        const unhashedPassword = bcrypt.compareSync(password, clientFound.password)
        if (!unhashedPassword) {
            return res.status(200).json({
                success: true,
                message: "Incorrect password."
            })
        }
        
        const token = jwt.sign(
            {
                id: clientFound.id,
                role: clientFound.role
            },
            app.get("JWT_SECRET"),
            {
                expiresIn: "24h"
            }
        )

        return res.status(200).json({
            success: true,
            message: "Client registered successfully",
            clientFound: {
                name: clientFound.name,
                surname: clientFound.surname,
                email: clientFound.email,
                phone: clientFound.phone
            },
            token
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

const profile = async (req:Request, res:Response) => {

    try {

        const client = req.token

        const clientFound = await Client.findOneBy({id: client.id})

        return res.status(200).json({
            success: true,
            client: {
                name: clientFound?.name,
                surname: clientFound?.surname,
                email: clientFound?.email,
                phone: clientFound?.phone
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
    register,
    login,
    profile,
    update
}