const mongoose=require('mongoose')
const validator=require('validator');

const studentSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,'Please Enter Student Full name']
    },
    phoneno:{
        type:Number,
        required:[true,'Please Enter Student phone no'],
        minlength:[10,'Phone number must be minimum 10 charactor'],
        maxlength:[10,'Phone number must be maximun 10 charactor'],
        /*validate:{
            validator:function(val){
                return val.length==10;
            },
            message:'Phone Number must be equal to 10 charctor'
        }*/

    },
    email:{
        type:String,
        required:[true,'Please Enter Student Email'],
        isLowercase:true
    },
    address:{
        type:String,
        required:[true,'Please Enter Student Full Address']
    },
    courseID:{
        type:mongoose.Types.ObjectId,
        ref:'Course',
        required:[true,'Course ID must be required']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide User ID']
    },
    imageid:{
        type:String,
        default:null
    },
    imageurl:{
        type:String,
        default:null
    },

},{timestamps:true})


module.exports=mongoose.model('Student',studentSchema)