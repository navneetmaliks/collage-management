const courseModel=require('./../models/Course')
const asyncWraper = require("../utils/asyncWraper")
const CustomError=require('./../utils/CustomError')
const {checkImage,uploadImage,getUserID,deleteImage}=require('./../utils/common')


const getAllCourse=asyncWraper(async(req,res,next)=>{
    const userID=await getUserID(req.user);
    const course=await courseModel.find({createdBy:userID}).select('-__v');
    if(!course){
        return next(new CustomError('No Course Found',400))
    }
    res.status(200).json({
        status:'success',
        courseCount:course.length,
        data:{
            course
        }
    })
})
const createCourse=asyncWraper(async(req,res,next)=>{
    const {courseName,description,price,startdate,endDate}=req.body;
    if(!courseName || !description || !price || !startdate || !endDate){
        return next(new CustomError('Please Fill all The Fields',400))
    }
     let imageid=null;
     let imageurl=null;
    if(req.files){
        const checkextension=await checkImage(req);
        
        if(!checkextension){
            return next(new CustomError(`invalid Image Extension ${req.files.image.name.split('.')[1]}`,400));
        }
        const imageresult=await uploadImage(req);
        console.log(imageresult);
         imageid=imageresult.imagekey
         imageurl=imageresult.imageurl

    }
    const userID=await getUserID(req.user);
     req.body.imageid=imageid;
     req.body.imageurl=imageurl;
     req.body.createdBy=userID;

     
    const course=await courseModel.create({...req.body});
    if(!course){
        return next(new CustomError('Course not saved',400))
    }

    
    
    res.status(200).json({
        status:'success',
        data:{
            course
        }
    })
})
const getSingleCourse=asyncWraper(async(req,res,next)=>{
    const userID=await getUserID(req.user);
    const {id:courseID}=req.params;
    if(!userID || !courseID){
        return next(new CustomError(`Invalid Request`,400))
    }
    const course=await courseModel.findOne({_id:courseID,createdBy:userID}).select('-__v');
    if(!course){
        return next(new CustomError(`no course found with id ${courseID}`,400))
    }
    res.status(200).json({
        status:'success',
        courseCount:course.length,
        course:{
            course
        }
    })
})
const updateCourse=asyncWraper(async(req,res,next)=>{
    const userID=await getUserID(req.user);
    const {id:courseID}=req.params;
    if(!userID || !courseID){
        return next(new CustomError(`Invalid Request`,400))
    }
    if(!userID || !courseID){
        return next(new CustomError(`Invalid Request`,400))
    }
    const course=await courseModel.findOne({_id:courseID,createdBy:userID}).select('-__v');
    if(!course){
        return next(new CustomError(`unauthorized access`,400))
    }
    if(req.files){
        let checkfile=await checkImage(req);
        if(checkfile){
            if(course.imageid){
                const imagedelete=await deleteImage(course.imageid);
            }
            
            const uplloadimage=await uploadImage(req);
            req.body.imageid=uplloadimage.imagekey
            req.body.imageurl=uplloadimage.imageurl
        }
    }
    const updateCourse=await courseModel.findOneAndUpdate({_id:courseID,createdBy:userID},req.body,{
        new:true,
        runValidators:true
    })
    if(!updateCourse){
        return next(new CustomError('Course Not Updated',400))
    }
    res.status(200).json({
        status:'success',
        data:{
            updateCourse
        }
    })
})
const deleteCourse=asyncWraper(async(req,res,next)=>{
    const userID=await getUserID(req.user);
    const {id:courseID}=req.params;
    if(!userID || !courseID){
        return next(new CustomError(`Invalid Request`,400))
    }
    const course=await courseModel.findOne({_id:courseID,createdBy:userID}).select('-__v');
    if(!course){
        return next(new CustomError(`no course found with id ${courseID}`,400))
    }
    const imageID=course.imageid;
    if(imageID){
        await deleteImage(imageID);
    }
    await courseModel.findOneAndDelete({_id:courseID,createdBy:userID})
    res.status(200).json({
        status:'success',
        data:{

        }
    })
})


module.exports={getAllCourse,createCourse,getSingleCourse,updateCourse,deleteCourse}