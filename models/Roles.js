const mong= require("mongoose");

const Roles=new mong.Schema({
    name:{
        type:String,
        required:true
    },
    
},{timestamps:true})

module.exports=mong.model('Roles',Roles)