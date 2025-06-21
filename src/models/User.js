import mongoose from "mongoose";
const { SchemaTypes: ST } = mongoose;


const user = new mongoose.Schema({
    name :{
        $type : ST.String,
        required : true,
        max : 20
    },
    age : {
        $type : ST.Number,
        max:100,
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
    }
}, {
  typeKey: '$type' // ✅ Tell Mongoose to use `$type` instead of `type`
})

//document middleware pre() , user before save() and create()

user.pre('save',function(next){
    console.log(this)
    next()
})

//querymiddleware pre (), user before get request to filter find()
user.pre('find',function(next){
    this.find({isActive : {$ne:true}})
    next()
})

//aggregation middleware
user.pre('aggregate',function(next){
   console.log(this.pipeline())
   next()
})
const User = mongoose.model('User',user);
export default User