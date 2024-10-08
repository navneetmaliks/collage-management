const feeModel=require('./../models/Fee')
const asyncWraper=require('./../utils/asyncWraper')
const CustomError=require('./../utils/CustomError')
const {getUserID}=require('./../utils/common')
const {feeValidation}=require('./../utils/feeValidation')

const getAllFee=asyncWraper(async(req,res,next)=>{
    const userID=await getUserID(req.user);
    //console.log(userID);
    if(!userID){
        return next(new CustomError('Invalid User',400))
    }
    const feeList=await feeModel.find({createdBy:userID})
    if(!feeList){
        return next(new CustomError('No Fee Record Found',400))
    }
    res.status(200).json({
        status:'success',
        feeCount:feeList.length,
        data:{
            feeList
        }
    })
})

const addFee=asyncWraper(async(req,res,next)=>{
    
    const userID=await getUserID(req.user);
    //console.log(userID);
    if(!userID){
        return next(new CustomError('Invalid User',400))
    }
    const checkinput=await feeValidation(req);
    
    if(checkinput.status==false){
        return next(new CustomError(checkinput.message,400))

    }

    req.body.createdBy=userID

    const addfee=await feeModel.create({...req.body})
    if(!addfee){
        return next(new CustomError('fee not saved',400))
    }

    res.status(200).json({
        status:'success',
        data:{
            addfee
        }
    })
})


module.exports={getAllFee,addFee}