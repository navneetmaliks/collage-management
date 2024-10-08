const userModel=require('./../models/User')
const asyncWraper=require('./../utils/asyncWraper')
const CustomError=require('./../utils/CustomError')
const jwt=require('jsonwebtoken');
const util=require('util')

exports.protect=asyncWraper(async(req,res,next)=>{
    const testToken=req.headers.authorization;
    
    let token;
    if(testToken && testToken.startsWith('Bearer')){
        token=testToken.split(' ')[1];

    }
    
    if(!token){
        return next(new CustomError('you are not logged in',400));
    }

    const jwtDecodeToken=await util.promisify(jwt.verify)(token,process.env.LOGIN_SECRET_STR);
    const user=await userModel.findById(jwtDecodeToken.userID).select('-password');
    if(!user){
        return next(new CustomError('Invalid User',400));
    }
    const passwordChanged=await user.isPasswordChanged(jwtDecodeToken.iat);
    if(passwordChanged){
        return next(new CustomError('Password Changed Please Login Again',400));
    }
    req.user=user;
    next();

})