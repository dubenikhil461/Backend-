import express from 'express'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'
import crypto from 'crypto';
import { sendOtpEmail } from '../config/sendotp.js'
const router = express.Router()

//register user /p/use/register
const validateuser = z.object({
    email: z.string().email(),
    username: z.string().min(2),
    password: z.string().min(6),
    role: z.string().optional(),
})

router.post('/register', async (req, res) => {
    try {
        const validate = validateuser.parse(req.body)
        const userexist = await User.findOne({ email: validate.email })
        if (userexist) return res.status(409).json({ message: 'user already exist' })
        else {
            const newOtp = (crypto.randomInt(100000, 1000000)).toString();
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
            await sendOtpEmail(validate.email, newOtp);
            const user = await User.create({
                email: validate.email,
                username: validate.username,
                otp: newOtp,
                otpExpiry: otpExpiry,
                password : validate.password,
                role: validate.role || 'user',
            });
            res.status(201).json({
                email: user.email,
                username: user.username,
                message: 'otp send successfully'
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

router.post('/verify-otp', async (req, res) => {
    try {
        const valid = z.object({
            email: z.string().email(),
            otp: z.string().min(6).max(6, { message: 'otp must be 6 digit' })
        }).parse(req.body)
        const user = await User.findOne({ email: valid.email })
        if (!user) return res.status(404).json({ message: 'user not found' })
        if (user.isVerified) return res.status(400).json({ message: 'user already verified' })
        const optvalid = user.otp && user.otpExpiry > Date.now();
        if (!optvalid) return res.status(401).json({ message: 'otp is invalid or expired' })
        if (user.otp !== valid.otp) return res.status(401).json({ message: 'otp is incorrect' })
        user.isVerified = true
        user.otp = undefined
        user.otpExpiry = undefined
        await user.save()
        return res.status(201).json({ message: 'user verified succesfully' })
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


const validlogincredential = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string()
})
router.post('/login', async (req, res) => {
    try {
        const usercredential = validlogincredential.parse(req.body)
        const user = await User.findOne({ email: usercredential.email })
        if (!user) return res.status(404).json({ message: 'user not found' })
        const passwordMatch = await bcrypt.compare(usercredential.password, user.password)
        if (!passwordMatch) return res.status(401).json({ message: 'Invalid credential' })
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 3600 * 1000 // 7 days
        })
        res.status(200).json({ message: 'logged in successfully', userId: user._id, email: user.email, username: user.username })
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

router.get('/me', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password')
    return res.status(201).json({
        user
    })
})

router.put('/update', authMiddleware, async (req, res) => {
    const data = z.object({
        email: z.string().email().optional(),
        username: z.string().min(2).optional(),
        password: z.string().min(6).optional(),
        role: z.string()
    }).parse(req.body);

    const updatequery = {};

    if (data.username) updatequery.username = data.username;
    if (data.email) updatequery.email = data.email;
    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(data.password, salt);
        updatequery.password = hashed;
    }

    const user = await User.findByIdAndUpdate(
        req.user.userId,
        updatequery,
        { new: true }
    ).select('-password');

    return res.status(200).json({ message: 'Updated successfully', user });
});

router.get('/admin', authMiddleware, adminMiddleware, async (req, res) => {
    res.send("hello i am admin")
})

router.get('/admin/promote/:id', authMiddleware, adminMiddleware, async (req, res) => {
    res.send("hello i am admin")
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