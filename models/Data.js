const mongoose = require('mongoose');
const { Schema }=mongoose;

const dataSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
   
    text:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
  });
  
  module.exports=mongoose.model('data',dataSchema);