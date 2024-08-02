const router=require('express').Router();
const notif=require('../models/Notif');
const students = require('../models/students');
const token=require('../Jwt/jwt');
const Personel = require('../models/Personel');
const ident_service = require('../models/ident_service');
const bcrypt=require('bcrypt')


router.post("/Login",(req,res)=>{
    const {Email,password}=req.body;
    if(Email==""||password==""){
        return res.send({err:'empty field'})
    }
    console.log({Email,password});
    students.findOne({Email}).then((users)=>{
        if (users){
            bcrypt.compare(password,users.password,(err,good)=>{   
                if (good) {
                    let access_token=token.generate_token(users)
                    console.log(access_token);
                  return  res.status(200).send({good:users,accesstoken:access_token}) 
                }else{
                    return res.send({err:"Wrong pass"})
                }
            }) 
        }else{
            Personel.findOne({Email}).then((users)=>{
                if (users){
                    bcrypt.compare(password,users.password,(err,good)=>{   
                        if (good) {
                            let access_token=token.generate_token(users)
                            console.log(access_token);
                          return  res.status(200).send({good:users,accesstoken:access_token}) 
                        }else{
                            return res.send({err:"Wrong pass"})
                        }
                    }) 
                }else{
                    ident_service.findOne({Email}).then((users)=>{
                        if (users){
                            bcrypt.compare(password,users.password,(err,good)=>{   
                                if (good) {
                                    let access_token=token.generate_token(users)
                                    console.log(access_token);
                                  return  res.status(200).send({good:users,accesstoken:access_token}) 
                                }else{
                                    return res.send({err:"Wrong pass"})
                                }
                            }) 
                       }
                    })
               }
           })
        }
   })
})

module.exports=router
