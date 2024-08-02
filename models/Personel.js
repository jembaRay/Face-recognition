const mongo=require('mongoose')

const Personel=new mongo.Schema({
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
    RoleId:{
        type:mongo.Types.ObjectId,
        ref:'Roles',
        required:true,
        default:"66acfa54e59c57a442d8cd15"
    }, 
    // PersoId: {
    //     type: mongo.Types.ObjectId,
    //     ref: 'Personel',
    //     required: true,
    //   },
},{timestamp:true})
module.exports=mongo.model("Personel",Personel)