const mongo=require('mongoose')
const students = require('./students')
const Personel = require('./Personel')

const justif=new mongo.Schema({
    message:{
      type:String,
      required:true,
    },
  file: {
    id: {
      type: mongo.Schema.Types.ObjectId,
      required: true
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