const express=require('express');
const { getAllStudent, addStudent, getSingleStudent, updateStudent, deleteStudent }=require('./../controllers/studentController')
const router=express.Router();

router.route('/').get(getAllStudent)
                 .post(addStudent)

router.route('/:id').get(getSingleStudent)
                    .patch(updateStudent)
                    .delete(deleteStudent)





module.exports=router