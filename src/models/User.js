import mongoose from "mongoose";
const { SchemaTypes: ST } = mongoose;


const user = new mongoose.Schema({
    name :{
        $type : ST.String,
        required : true,
        max : 20
    },
    description : {
        $type : ST.String,
        required : true,
        max : [100,'Over Length'],
    },
    rating : {
        $type : ST.Number,
        min : 0,
        max : 5
    }
}, {
  typeKey: '$type' // ✅ Tell Mongoose to use `$type` instead of `type`
})

const User = mongoose.model('User',user);
export default User