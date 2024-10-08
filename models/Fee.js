const mongoose=require('mongoose')
const validator=require('validator');


const feeSchema=new mongoose.Schema({
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:'Course',
        required:[true,'Please Select Course']
    },
    phoneno:{
        type:String,
        ref:'Student',
        maxlength:[10,'Mobile Number Must be of 10 Digit'],
        minlength:[10,'Mobile Number can not be exceed 10 Digit'],
        required:[true,'Please Select Phone']
    },
    fee:{
        type:Number,
        required:[true,'Please Enter Fee Amount']
    },
    remark:{
        type:String,
        required:[true,'Please Enter Remark']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please Provide provider Name']
    },
},{timestamps:true})


module.exports=mongoose.model('Fee',feeSchema);