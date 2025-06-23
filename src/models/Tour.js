import mongoose from "mongoose";
const { SchemaTypes: ST } = mongoose;


const tour = new mongoose.Schema({
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

//document middleware pre() , tour before save() and create()

tour.pre('save',function(next){
    console.log(this)
    next()
})

//querymiddleware pre (), tour before get request to filter find()
tour.pre('find',function(next){
    this.find({isActive : {$ne:true}})
    next()
})

//aggregation middleware
tour.pre('aggregate',function(next){
   console.log(this.pipeline())
   next()
})
const Tour = mongoose.model('Tour',tour);
export default Tour