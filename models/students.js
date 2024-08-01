const mongo=require('mongoose')
const Roles = require('./Roles')


const student=new mongo.Schema({
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
    Telephone:{
        type:Number,
        required:true,
        unique:true,
        minlength:9
    },
    password:{
        type:String,
        minlength:7,
        required:true
    },
    absences:{
        type:Number,
        default:0
    },
    ClassId:{
        type:mongo.Types.ObjectId,
        ref:'Class',
        required:true
    },
    RoleId:{
        type:mongo.Types.ObjectId,
        ref:'Roles',
        required:true,
        default:''
    },
    descriptor: { type: [Number], required: true, length: 128 },

},{timestamp:true})





module.exports=mongo.model("student",student)