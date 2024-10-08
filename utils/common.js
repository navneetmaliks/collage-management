const asyncWraper=require('./asyncWraper')
const CustomError=require('./CustomError')
const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

exports.checkImage=async(req)=>{
    if(req.files){
        const imageDetails=req.files.image;
        const imageName=imageDetails.name;
        const imgExtension=imageName.split('.')[1];
        const availbleExt=process.env.IMAGE_EXT
        const arrayofextension=availbleExt.split(',')
        return arrayofextension.indexOf(imgExtension) + 1;
        
    }

}

exports.uploadImage=async (req)=>{
    const imageUpload=await cloudinary.uploader.upload(req.files.image.tempFilePath);
      const imagedata={
        imageurl:imageUpload.secure_url,
        imagekey:imageUpload.public_id
      }
      return imagedata;

}
exports.deleteImage=async (imageID)=>{
    const deleteImage=await cloudinary.uploader.destroy(imageID);
      return deleteImage;

}

exports.getUserID=async(user)=>{
    const userID=user._id;
    return userID;
}