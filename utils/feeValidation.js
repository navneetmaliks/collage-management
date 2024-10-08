const feeValidation=async(feedata)=>{
    const {courseId,phoneno,fee,remark,createdBy}=feedata.body
    let recordscheck;
    if(!courseId){
        recordscheck={status:false,message:'Course ID is empty'};
        return recordscheck
    }
    if(!phoneno){
        recordscheck={status:false,message:'Phone number is empty'};
        return recordscheck
    }
    if(phoneno){
        const pattern = /^\d+\.?\d*$/;
        const checknumber=pattern.test(phoneno);  // returns a boolean
        if(!checknumber){
        recordscheck={status:false,message:'Only Number Allowed'};
        return recordscheck
          }
        if(phoneno.length!=10){
            recordscheck={status:false,message:'Phone Number Must be of 10 charactor'};
        return recordscheck

        }
    }
    if(!fee){
        recordscheck={status:false,message:'Fee is empty'};
        return recordscheck
    }
    if(fee){
        if(!/^[0-9]+$/.test(fee)){
            recordscheck={status:false,message:'Only number'};
            return recordscheck
        }
        
    }
    if(!remark){
        recordscheck={status:false,message:'Remark is empty'};
        return recordscheck
    }
    
    recordscheck={status:true};
        return recordscheck

}


module.exports={feeValidation}


