const userModel=require('./../models/User')
const bcrypt=require('bcryptjs');
const asyncWraper=require('./../utils/asyncWraper')
const CustomError=require('./../utils/CustomError')
const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

const hashpassword=async(password)=>{
    return await bcrypt.hash(password,12);
}
const updateUser=asyncWraper(async(req,res,next)=>{
    const userID=req.params.id;
    const {firstname,lastname,email}=req.body;


})
const updatePic=asyncWraper(async(req,res,next)=>{
    const userID=req.params.id;
    const checkUser=await userModel.findById({_id:userID}).select('-password')
    if(!checkUser){
        return next(new CustomError('No User Found',400));
    }
    
    /*const userImageId=checkUser.imagekey;
    if(!userImageId){*/
      const imageUpload=await cloudinary.uploader.upload(req.files.image.tempFilePath);
      const imagedata={
        imageurl:imageUpload.secure_url,
        imagekey:imageUpload.public_id
      }
      
      
    // }
    
    const updateUser=await userModel.findByIdAndUpdate({_id:userID},imagedata,{
        new:true,
        runValidators:true
    })

    if(!updateUser){
        return next(new CustomError('image not updated',400))
    } 
   
    res.status(200).json({
        status:'success',
        data:{
            updateUser
        }
    })

})

const changePassword=asyncWraper(async(req,res,next)=>{
    const {id:userID}=req.params
    const {oldpassword,password,confirmPassword}=req.body;
    if(!oldpassword || !password || !confirmPassword){
        return next(new CustomError('please fill all fields',400));
    }
    const user=await userModel.findById({_id:userID});
    if(!user){
        return next(new CustomError('invalid user',400))
    }
    const matchOldpassword=await user.comparePasswordInDb(oldpassword);
    if(!user || !matchOldpassword){
        return next(new CustomError('invalid Password',400));
    }
    const generatePasswordResetToken=await user.createPasswordRestToken();
    const updatefields={
        password:await hashpassword(password),
        resetPasswordToken:generatePasswordResetToken,
        resetPasswordTokenExpiry:Date.now()+10*60*1000,
        passwordChangedAt:Date.now()
    }
    const updatepass=await userModel.findByIdAndUpdate({_id:userID},updatefields,{
        new:true,
        runValidators:true
    })
    if(!updatepass){
        return next(new CustomError('password not updated',400));
    }
    res.status(200).json({
        status:'success',
        data:{
            updatepass
        }
    })


})

module.exports={updateUser,updatePic,changePassword}