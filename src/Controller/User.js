import User from "../models/User.js";
import { z } from 'zod'
export const createUser = async (req, res) => {
    try {
        req.body =
            z.object({
                name: z.string().min(1, 'name is required'),
                description: z.string().min(1, 'description is required'),
                rating: z.number().min(1).max(5),
            }).parse(req.body)
            
        const newUser = await User.create(req.body)
        res.status(201).json({
            status: 'Success',
            data: newUser
        })
    } catch (error) {
        if(error.name ==='ZodError'){
            return res.status(400).json({
                status : 'failed',
                message : 'validation error',
                errors : error.errors
            })
        }
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const getallusers = async(req,res)=>{
    try {
        const user = await User.find()
        return res.status(200).json({
            status : 'Success',
            data : {
                user
            }
        })
    } catch (error) {
        return res.status(500).json({status : 'failed' , error : error.message})
    }
}

export const getuser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        return res.status(201).json({status : 'succes', data : {user}})
    } catch (error) {
        return res.status(500).json({status : 'succes', error : error.message}) 
    }
}