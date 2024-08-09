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
        type:mong.Types.ObjectId,
        required:true,
        ref:'student' 
    },
    ClassId:{
        type:mong.Types.ObjectId,
        ref:'Class',
        required:true
    },
    date:{
        type:'string',
        required:true
    }
    
},{timestamps:true})
module.exports=mong.model("Attendance",Attendance)