const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:[true,'Please Enter Course Name']
    },
    description:{
        type:String,
        required:[true,'Please Enter Course Description']
    },
    price:{
        type:Number,
        required:[true,'Please Enter Course price']
    },
    startdate:{
        type:Date,
        required:[true,'Please Enter Course start date']
    },
    endDate:{
        type:Date,
        required:[true,'Please Enter Course End date']
    },
    imageid:{
        type:String,
        default:null
    },
    imageurl:{
        type:String,
        default:null
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please Provide User']
    }
},{timestamps:true});


module.exports=mongoose.model('Course',courseSchema)