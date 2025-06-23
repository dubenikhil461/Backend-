import express from 'express'
import { z } from 'zod'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()

//register user /p/use/register
const validateuser = z.object({
    email: z.string().email(),
    username: z.string().min(2),
    password: z.string().min(6)
})

router.post('/register', async (req, res) => {
    try {
        const validate = validateuser.parse(req.body)
        const userexist = await User.findOne({ email: validate.email })
        if (userexist) return res.status(409).json({ message: 'user already exist' })
        else {
            const user = await User.create({ ...validate })
            res.status(201).json({
                email: user.email,
                username: user.username,
                message: 'user register succesfully'
            })
        }
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({
                message: 'validation error',
                errors: error.errors
            })
        }
        else {
            return res.status(500).json({
                message: 'server error',
                error: error.message || error,
            })
        }
    }
})

const validlogincredential = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
router.post('/login', async (req, res) => {
    try {
        const usercredential = validlogincredential.parse(req.body)
        const user = await User.findOne({ email: usercredential.email })
        if (!user) return res.status(404).json({ message: 'user not found' })
        const passwordMatch = await bycrypt.compare(usercredential.password, user.password)
        if (!passwordMatch) return res.status(401).json({ message: 'Invalid credential' })
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: 'user' },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 3600 * 1000 // 7 days
        })
        res.status(200).json({ message: 'logged in successfully', userId : user._id, email :user.email,username :user.username})
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({
                message: 'validation error',
                errors: error.errors
            })
        } else {
            return res.status(500).json({
                message: 'server error',
                error: error.message || error,
            })
        }
    }
})

router.get('/me',authMiddleware,async (req,res) => {
    res.json({message:'hello'})
})

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,       // use true in production only (HTTPS)
    sameSite: 'Strict'
  });
  res.redirect('/login')
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router