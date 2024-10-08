const express=require('express');
const {getAllStudentViaCourse}=require('./../controllers/studentCourseController')
const router=express.Router();

router.route('/:courseid').get(getAllStudentViaCourse)






module.exports=router