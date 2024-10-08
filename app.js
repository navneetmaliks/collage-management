const express=require('express')
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload')
const CustomError=require('./utils/CustomError')
const globalErrorHandler=require('./controllers/errorConotroller')
const protectRoute=require('./controllers/authController')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
const studentRoutes=require('./routes/studentRoutes')
const courseRoutes=require('./routes/courseRoutes')
const studentCourseRoutes=require('./routes/studentCourseRoutes')
const feeRoutes=require('./routes/feeRoutes')


const app=express();
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles : true,
    // tempFileDir : '/tmp/'
}));




//routes here

app.get('/',(req,res)=>{
    res.send('collage management')
})

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',protectRoute.protect,userRoutes)
app.use('/api/v1/course',protectRoute.protect,courseRoutes)
app.use('/api/v1/course-students',protectRoute.protect,studentCourseRoutes)
app.use('/api/v1/student',protectRoute.protect,studentRoutes)
app.use('/api/v1/fee',protectRoute.protect,feeRoutes)
app.use('*',(req,res,next)=>{
    const err=`No Route Found With ${req.originalUrl}`;
    next(new CustomError(err,404))
})


app.use(globalErrorHandler);





module.exports=app;