const mong=require('mongoose')
const students = require('./students')

const Attendance=new mong.Schema({
    First_period:{
        type:Boolean,
        default:false
    },
    Second_period:{
        type:Boolean,
        default:false
    },
    Third_period:{
        type:Boolean,
        default:false
    },
    studId:{
        type:String,
        required:true,
        ref:'students' 
    },
    date:{
        type:'string',
        required:true
    }
    
},{timestamps:true})
module.exports=mong.model("Attendance",Attendance)