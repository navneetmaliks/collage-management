const studentModel=require('./../models/Student')
const CustomError=require('./../utils/CustomError')
const asyncWraper=require('./../utils/asyncWraper')
const {studentFormValidation}=require('./../utils/studentValidation')
const {checkImage,uploadImage,getUserID,deleteImage}=require('./../utils/common')



const getAllStudentViaCourse=asyncWraper(async(req,res,next)=>{
    const courseid=req.params.courseid;
    if(!courseid){
        return next(new CustomError('Empty course id',400))
        
    }
    const students=await studentModel.find({courseID:courseid});

    if(!students){
        return next(new CustomError('NO students found in this course id',400));
    }
    res.status(200).json({
        status:'success',
        studentCount:students.length,
        data:{
            students
        }
    })

})



module.exports={getAllStudentViaCourse}