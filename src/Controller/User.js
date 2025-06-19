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
        // filter
        const queryObj = { ...req.query }
        const excludefields = ['page', 'sort', 'limit', 'field']
        excludefields.forEach((el) => delete queryObj[el])

        // sorting
        let query = User.find(queryObj)
        if (req.query.sort) {
            const sortby = req.query.sort.split(',').join('')
            query = query.sort(sortby)
        }

        //fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join('')
            query = query.select(fields)
        }
        
        // pagination 
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page-1)* limit
 
        query = query.skip(skip).limit(limit)
        const total = await User.countDocuments()

        const user = await query
        return res.status(200).json({
            status: 'Success',
            data: {
                total,
                user,
                page,
                limit,
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