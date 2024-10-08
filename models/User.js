const mongoose=require('mongoose')
const validator=require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');


const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'Please Enter First Name'],

    },
    lastname:{
        type:String,
        required:[true,'Please Enter Last Name'],

    },
    email:{
        type:String,
        required:[true,'Please Enter Email'],
        isLowercase:true,
        unique:true,
        validate:{
            validator:val=>validator.isEmail(val,['en-us']),
            message:'please provide valid email'
        }

    },
    imageurl:{
        type:String,
       default:null,

    },
    imagekey:{
        type:String,
       default:null,

    },
    password:{
        type:String,
        required:[true,'Please Enter password'],

    },
    confirmPassword:{
        type:String,
        required:[true,'Please Enter confirm Password'],
        validate:{
            validator:function(val){
                return val==this.password
            },
            message:'Password Not Matched'
        }

    },
    passwordChangedAt:{
        type:Date

    },
    resetPasswordToken:{
        type:Date

    },
    resetPasswordTokenExpiry:{
        type:Date

    },
});

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
    this.confirmPassword=undefined;
    next();

})

UserSchema.methods.comparePasswordInDb=async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.isPasswordChanged=async function(jwtPasswordChangedTime){
    if(this.passwordChangedAt){
        const passwordChangedTime=parseInt(this.passwordChangedAt.getTime()/1000,10);
        return jwtPasswordChangedTime < passwordChangedTime
    }
    return false;
}

UserSchema.methods.createPasswordRestToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordTokenExpiry=Date.now()+10*60*1000;
    return resetToken;
}

UserSchema.methods.createSignInToken=function(){
    return jwt.sign({userID:this._id,name:this.firstname},process.env.LOGIN_SECRET_STR,{
        expiresIn:process.env.LOGIN_EXPIRES
    })
}

UserSchema.methods.getName=function(){
    return this.firstname;
}

module.exports=mongoose.model('User',UserSchema);



