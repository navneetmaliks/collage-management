const express=require('express');
const {getAllCourse,createCourse,getSingleCourse,updateCourse,deleteCourse}=require('./../controllers/courseController')
const router=express.Router();

router.route('/').get(getAllCourse)
                 .post(createCourse);

router.route('/:id').get(getSingleCourse)
                    .patch(updateCourse)
                    .delete(deleteCourse)







module.exports=router