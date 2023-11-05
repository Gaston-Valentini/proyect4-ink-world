import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import app from "../app/app"

import { TattooArtist } from "../entities/TattooArtist"

const register = async (req:Request, res:Response) => {
    
    try {

        const { nickname, name, surname, email, password, phone } = req.body

        const tattooArtistFound = await TattooArtist.findOneBy({email})

        if (tattooArtistFound) {
            return res.status(200).json({
                success: true,
                message: "A tattooArtist is already registered with that email address."
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const tattooArtistRegistered = await TattooArtist.create({
            nickname,
            name,
            surname,
            email,
            password: hashedPassword,
            phone
        }).save()

        return res.status(200).json({
            success: true,
            message: "Tattoo artist registered successfully",
            clientRegistered: {
                nickname: tattooArtistRegistered.nickname,
                name: tattooArtistRegistered.name,
                surname: tattooArtistRegistered.surname,
                email: tattooArtistRegistered.email,
                phone: tattooArtistRegistered.phone
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

        const tattooArtistFound = await TattooArtist.findOneBy({email})

        if (!tattooArtistFound) {
            return res.status(200).json({
                success: true,
                message: "There is no registered user with that email address."
            })
        }

        const unhashedPassword = bcrypt.compareSync(password, tattooArtistFound.password)
        if (!unhashedPassword) {
            return res.status(200).json({
                success: true,
                message: "Incorrect password."
            })
        }
        
        const token = jwt.sign(
            {
                id: tattooArtistFound.id,
                role: tattooArtistFound.role
            },
            app.get("JWT_SECRET"),
            {
                expiresIn: "24h"
            }
        )

        return res.status(200).json({
            success: true,
            clientFound: {
                nickname: tattooArtistFound.nickname,
                name: tattooArtistFound.name,
                surname: tattooArtistFound.surname,
                email: tattooArtistFound.email,
                phone: tattooArtistFound.phone
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

const getAppoitments = async (req:Request, res:Response) => {

    try {

        const id = req.token.id

        const tattooArtistFound = await TattooArtist.findOne({where: {id}, relations: ["appoitments"]});
        
        const appointments = tattooArtistFound?.appoitments

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

const getAllTattooArtists = async (req:Request, res:Response) => {

    try {

        const tattooArtistsFound = await TattooArtist.find();

        return res.status(200).json({
            success: true,
            tattooArtistsFound
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

        await TattooArtist.delete({id});

        return res.status(200).json({
            success: true,
            message: "Tattoo artist deleted successfully"
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
    getAppoitments,
    getAllTattooArtists,
    remove
}