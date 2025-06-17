import User from "../models/User.js";
import { z } from 'zod'
export const createUser = async (req, res) => {
    try {
        req.body =
            z.object({
                name: z.string().max(20, 'Name must be at most 20 characters'),
                age: z.string(),
                description: z.string().max(100, 'Over Length'),
                score: z.number().max(100),
                roles: z.array(z.string()),
                address: z.string(),
                tags: z.array(z.string()),
                isActive: z.boolean(),
                email: z.string().email('Invalid email address'),
            }).parse(req.body)

        const newUser = await User.create(req.body)
        res.status(201).json({
            status: 'Success',
            data: newUser
        })
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({
                status: 'failed',
                message: 'validation error',
                errors: error.errors
            })
        }
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const getallusers = async (req, res) => {
    try {
        const queryObj = {...req.query}
        const excludefields = ['page','sort','limit','fields']
        excludefields.forEach((el)=> delete queryObj[el])
        const user = await User.find(queryObj)
        return res.status(200).json({
            status: 'Success',
            data: {
                user
            }
        })
    } catch (error) {
        return res.status(500).json({ status: 'failed', error: error.message })
    }
}

export const getuser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(201).json({ status: 'succes', data: { user } })
    } catch (error) {
        return res.status(500).json({ status: 'succes', error: error.message })
    }
}

export const updateuser = async (req, res) => {
    try {
        const newuser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runvalidators: true
        })
        return res.status(200).json({ status: "success", newuser })
    } catch (error) {
        return res.status(500).json({ status: "failed", error })
    }
}

export const deleteuser = async (req, res) => {
    try {
        await User.findOneAndDelete(req.params.id)
        return res.status(200).json({ status: "success" })
    } catch (error) {
        return res.status(500).json({ status: "failed", error })
    }
}