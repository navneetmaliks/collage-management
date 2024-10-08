const express=require('express');
const {updateUser,updatePic,changePassword}=require('./../controllers/userController')
const router=express.Router();

router.route('/:id').patch(updateUser);
router.route('/profilepic/:id').patch(updatePic);
router.route('/changepassword/:id').patch(changePassword);







module.exports=router