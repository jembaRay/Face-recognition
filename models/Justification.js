const mongo=require('mongoose')
const students = require('./students')
const Personel = require('./Personel')
const { type } = require('mocha/lib/utils')

const justif=new mongo.Schema({
    state:{
      type:String,
      default:"Pending"
    },
    message:{
      type:String,
      required:true,
    },
  file: {
    content: {
      type: Buffer,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    filename: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    }},
    studId:{
        type:String,
        required:true,
        ref:'students'
    },
    PersoId:{
        type:String,
        required:true,
        ref:'Personel'
    }
},{timestamp:true})

module.exports=mongo.model("justif",justif)