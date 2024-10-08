const mongoose = require('mongoose');

const DbConnect=(DB_STR)=>{
    return mongoose.connect(DB_STR)
}

module.exports=DbConnect;