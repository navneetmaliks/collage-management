const userModel=require('./../models/User')
const asyncWraper=require('./../utils/asyncWraper')
const CustomError=require('./../utils/CustomError')
const jwt=require('jsonwebtoken');
const util=require('util')

const createSendResponse=(user,statusCode,res)=>{
    const token=user.createSignInToken();
    const options={
        expiresIn:process.env.LOGIN_EXPIRES,
        httpOnly:true
    }
    if(process.env.NODE_ENV==='production'){
        options.secure=true
    }
    res.cookie('jwt'.token,options);
    user.confirmPassword=undefined;
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}
exports.register=asyncWraper(async(req,res,next)=>{
    const {firstname,lastname,email,password,confirmPassword}=req.body;
    if(!firstname || !lastname || !email || !password || !confirmPassword){
        return next(new CustomError('Please Fill all Fields',400));
    }
    const newUser=await userModel.create({...req.body});
    if(!newUser){
        return next(new CustomError('user not created',400))
    }

    createSendResponse(newUser,200,res)


})
exports.signin=asyncWraper(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new CustomError('Please enater Email and Password',400));
    }
    const user=await userModel.findOne({email});
    if(!user){
        return next(new CustomError('Invalid Email or Password',400));

    }
    const isMatched= await user.comparePasswordInDb(password);
    if(!user || !isMatched){
        return next(new CustomError('Email or Password Not Matched',400));
    }


    createSendResponse(user,200,res);

})
exports.forgotPassword=asyncWraper(async(req,res,next)=>{
    

})

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