import mongoose from "mongoose";
import bycrypt from 'bcrypt'
const { SchemaType: ST } = mongoose;

const userschema = new mongoose.Schema({
    email: { $type: String, required: true, unique: true },
    username: { $type: String, required: true, unique: true },
    password: { $type: String, required: true}
}, {
    typeKey: '$type',
    timestamps :true,
})


userschema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    try {
        const salt = await bycrypt.genSalt(10)
        this.password = await bycrypt.hash(this.password,salt)
        next()
    } catch (error) {
        next(error)
    }
})
const User = mongoose.model('User',userschema)
export default User