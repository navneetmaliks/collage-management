const studentModel=require('./../models/Student')
const CustomError=require('./../utils/CustomError')
const asyncWraper=require('./../utils/asyncWraper')
const {studentFormValidation}=require('./../utils/studentValidation')
const {checkImage,uploadImage,getUserID,deleteImage}=require('./../utils/common')


const getAllStudent=asyncWraper(async(req,res,next)=>{
    const students=await studentModel.find({});
    if(!students){
        return next(new CustomError('NO students found',400));
    }
    res.status(200).json({
        status:'success',
        studentCount:students.length,
        data:{
            students
        }
    })

})
const addStudent=asyncWraper(async(req,res,next)=>{
    const validateStudent=await studentFormValidation(req);
    if(validateStudent.status==false){
        const message=validateStudent.message;
        return next(new CustomError(message,400))
    }
    let imageid=null;
     let imageurl=null;
    if(req.files){
        const checkextension=await checkImage(req)
        if(!checkextension){
            return next(new CustomError(`invalid Image Extension ${req.files.image.name.split('.')[1]}`,400));
        }
        const imageresult=await uploadImage(req);
         imageid=imageresult.imagekey
         imageurl=imageresult.imageurl
    }
    const userID=await getUserID(req.user);
     req.body.imageid=imageid;
     req.body.imageurl=imageurl;
     req.body.createdBy=userID;

     const student=await studentModel.create({...req.body});
    if(!student){
        return next(new CustomError('student not saved',400))
    }
 
    res.status(200).json({
        status:'success',
        data:{
            student
        }
    })

})
const getSingleStudent=asyncWraper(async(req,res,next)=>{
    const {id:studentID}=req.params
    if(!studentID){
        return next(new CustomError('invalid id',400))
    }
    const student=await studentModel.find({_id:studentID}).populate({path:'courseID',model:'Course'})
    if(!student){
        return next(new CustomError(`no student found with id ${studentID}`,400))
    }
    res.status(200).json({
        status:'success',
        data:{
            student
        }
    })

})
const updateStudent=asyncWraper(async(req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:'update student'
    })

})
const deleteStudent=asyncWraper(async(req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:'delete student'
    })

})

module.exports={getAllStudent,addStudent,getSingleStudent,updateStudent,deleteStudent}