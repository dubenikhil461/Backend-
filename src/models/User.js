import mongoose from "mongoose";
const { SchemaTypes: ST } = mongoose;


const user = new mongoose.Schema({
    name :{
        $type : ST.String,
        required : true,
        max : 20
    },
    age : {
        $type : ST.String,
        required : true
    },
    description : {
        $type : ST.String,
        required : true,
        max : [100,'Over Length'],
    },
    score : {
        $type : ST.Number,
        max : 100
    },
    roles : [ST.String],
    address : {
        $type : ST.String,
        required : true
    },
    tags : [ST.String],
    isActive : {
        $type : ST.Boolean,
        required : true 
    },
    email : {
        $type : ST.String,
        required : true,
        unique : true
    }
}, {
  typeKey: '$type' // ✅ Tell Mongoose to use `$type` instead of `type`
})

const User = mongoose.model('User',user);
export default User