import Tour from "../models/Tour.js";
import { z } from 'zod'
const validateschema = z.object({
    name: z.string().max(20, 'Name must be at most 20 characters'),
    age: z.number().optional(),
    description: z.string().max(100, 'Over Length'),
    score: z.number().max(100).optional(),
    roles: z.array(z.string()).optional(),
    address: z.string(),
    tags: z.array(z.string()).optional(),
    isActive: z.boolean(),
    email: z.string().email('Invalid email address'),
})

export const createTour = async (req, res) => {
    try {
        const validate = validateschema.parse(req.body)

        const newTour = await Tour.create(validate)
        res.status(201).json({
            status: 'Success',
            data: newTour
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

export const getalltours = async (req, res) => {
    try {
        // filter
        const queryObj = { ...req.query }
        const excludefields = ['page', 'sort', 'limit', 'field']
        excludefields.forEach((el) => delete queryObj[el])

        // sorting
        let query = Tour.find(queryObj)
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
        const skip = (page - 1) * limit

        query = query.skip(skip).limit(limit)
        const total = await Tour.countDocuments()

        const tour = await query
        return res.status(200).json({
            status: 'Success',
            data: {
                total,
                tour,
                page,
                limit,
            }
        })
    } catch (error) {
        return res.status(500).json({ status: 'failed', error: error.message })
    }
}

export const gettour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        return res.status(201).json({ status: 'succes', data: { tour } })
    } catch (error) {
        return res.status(500).json({ status: 'succes', error: error.message })
    }
}

export const updatetour = async (req, res) => {
    try {
        const newtour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runvalidators: true
        })
        return res.status(200).json({ status: "success", newtour })
    } catch (error) {
        return res.status(500).json({ status: "failed", error })
    }
}

export const deletetour = async (req, res) => {
    try {
        await Tour.findOneAndDelete(req.params.id)
        return res.status(200).json({ status: "success" })
    } catch (error) {
        return res.status(500).json({ status: "failed", error })
    }
}

const updatequery = {
    numtour: { $sum: 1 },
    avgage: { $avg: '$age' },
    minage: { $min: '$age' },
    maxage: { $max: '$age' },
    sumage: { $sum: '$age' },
    avgscore: { $avg: '$score' },
    minscore: { $min: '$score' },
    maxscore: { $max: '$score' },
    sumscore: { $sum: '$score' },
}

export const gettourstat = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            // { $match: { age : {$gt : 1}}},
            // { $sort : { age : -1}},
            {
                $group: {
                    _id: null,
                    ...updatequery
                }
            }
        ]);

        return res.status(200).json({ status: 'success', stats });
    } catch (error) {
        return res.status(400).json({ error });
    }
}


export const gettourplan = async (req, res) => {
    try {
        const role = req.params.role
        const plan = await Tour.aggregate([
            { $unwind: '$roles' },
            { $match: { roles: `${role}` } },
            {
                $group: {
                    _id: '$roles',
                    count: { $sum: 1 },
                    name: { $push: '$name' }
                }
            }

        ])
        return res.status(200).json({ status: 'success', plan });

    } catch (error) {
        return res.status(400).json({ error });
    }
}