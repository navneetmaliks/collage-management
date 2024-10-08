const studentFormValidation=async(studentdata)=>{
    const {fullname,phoneno,email,address,courseID}=studentdata.body
    let recordscheck;
    if(!fullname){
        recordscheck={status:false,message:'Full name is empty'};
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
    if(!email){
        recordscheck={status:false,message:'Email is empty'};
        return recordscheck
    }
    if(email){
        const pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const checkemail= pattern.test(email);  // returns a boolean
        if(!checkemail){
            recordscheck={status:false,message:'Please Enter Valid Email'};
            return recordscheck
              }
    }
    if(!address){
        recordscheck={status:false,message:'Address is empty'};
        return recordscheck
    }
    if(!courseID){
        recordscheck={status:false,message:'Course ID is empty'};
        return recordscheck
    }
    recordscheck={status:true};
        return recordscheck

}


module.exports={studentFormValidation}


