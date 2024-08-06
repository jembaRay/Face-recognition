const mongoose=require('mongoose')

const ident_service=new mongoose.Schema({
    First_name:{
        type:String,
        required:true,
        
    },
    Last_name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        minlength:6
    },
    RoleId:{
        type:mongoose.Types.ObjectId,
        ref:'Roles',
        required:true
    },
    password:{
        type:String,
        minlength:7,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('ident_service',ident_service)