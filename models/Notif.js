const mongo=require("mongoose")
const Personel = require("./Personel")

const Notif=new mongo.Schema({
    message:{
        type:String,
        required:true,
        minlenght:15
    },
    PersoId:{
        type:mongo.Types.ObjectId,
        ref:Personel,
        required:true
    },
    studId:{
        type:String,
        required:true,
        ref:'students'
    }
},{timestamp:true})

module.exports=mongo.model("notifiaction",Notif)
