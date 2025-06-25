import mongoose from "mongoose";
import bycrypt from 'bcrypt'
const { SchemaTypes: ST } = mongoose;

const userschema = new mongoose.Schema({
    email: { $type: ST.String, required: true, unique: true },
    username: { $type: ST.String, required: true, unique: true },
    password: { $type: ST.String, required: true },
    role: { $type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { $type: ST.Boolean, default: false },
    otp: { $type: ST.String },
    otpExpiry: { $type: ST.Date }

}, {
    typeKey: '$type',
    timestamps: true,
})


userschema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bycrypt.genSalt(10)
        this.password = await bycrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})
const User = mongoose.model('User', userschema)
export default User