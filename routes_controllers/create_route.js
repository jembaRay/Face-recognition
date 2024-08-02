const router=require('express').Router()
const notif=require('../models/Notif')
const Student=require('../models/students')
const clas=require('../models/Clas')
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const token=require('../Jwt/jwt');
const students = require('../models/students');
const Justi = require('../models/Justification');
const Personel = require('../models/Personel');
const Roles = require('../models/Roles');
const bcrypt=require('bcrypt')

// Configure the GridFS storage
const storage = new GridFsStorage({
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    }
  });
  
  // Create the Multer upload instance
  const upload = multer({ storage: storage });
  

//Create Notification for the whole class or onli one student
router.post('/Notificaton',(req,res)=>{
    const tokene=req.headers.token
    const PersoId=token.getUserId(tokene) 
    const {studId,classid,message}=req.body
    if (classid) {
    // Find students with the specified classId
    Student.find({ClassId:classid})
    .then(students => {
        // Create a notification for each student
        students.forEach(student => {
        notif.create({
            message,
            PersoId,
            studId: student.id
        })
        .then(() => {
            console.log(`Notification created for student: ${student.name}`);
        })
        .catch(error => {
            console.error(`Error creating notification for student ${student.name}: ${error}`);
        });
        });

        res.status(200).send({ message: 'Notifications created successfully' });
    })
    .catch(error => {
        console.error('Error finding students:', error);
        res.status(400).send({ error: 'Error creating notifications' });
    });
    }
    if (studId){
      notif.create({
        message,
        PersoId,
        studId
        }).then((notif)=>{
        res.status(200).send({notif})
        })
        .catch((error)=>{
            res.status(400).send({error})
        })
    }
})

//create personel
router.post('/createPersonel',(req,res)=>{
  const tokene=req.headers.token
  const PersoId= token.getUserId(tokene)
  const roleId= token.getRoleId(tokene)
  
  const { First_name, Last_name, Email, Telephone, password } = req.body;
 // console.log({ First_name, Last_name, Email, Telephone, password });
 if (roleId!='66acfc179213f789d384dee8'){
  res.send({"error":'login you are not authenticated or you are not admin'})
  
 }else{
  Personel.findOne({$or:[{Email},{Telephone}]}).then((existing)=>{
    if (existing) {
      console.log(existing);
       let errorMessage='';
       if (existing.Email === Email) {
           errorMessage = 'Email already exists.';
        } else if (existing.Telephone.toString() === Telephone) {
           errorMessage = 'Telephone number already exists.';
       }
         return res.status(400).send({err:errorMessage})
          
   } else{
    
    bcrypt.hash(password,6,(err,bcrypted)=>{
      if (err) {
           res.status(500).send(err)
       }
               Personel.create({
                  First_name,
                  Last_name,
                   Email, 
                   Telephone,
                   password: bcrypted,
                   PersoId
              }).then((perso)=>{
                  res.status(200).send({perso})
              }).catch((error)=>{
                res.send(error)
              
               })    
   })
  }
}).catch((error)=>{
  res.send(error)

 })
 }       
})


//to create a new class 
router.post('/createClass',(req,res)=>{
    const tokene=req.headers.token
    const persoId= token.getUserId(tokene) 
    console.log(persoId);
    const {Name}=req.body
  console.log(Name);
 clas.create({
      Name, 
     persoId
  }).then((clas)=>{
      res.status(200).send({clas})
    })
})

//to create a new class 
router.post('/createRole',(req,res)=>{
  const Name=req.body.name
  console.log({Name  });
  Roles.create({
      name:Name
  }).then((role)=>{
      res.status(200).send({role})
  })
})

// Define the /create_justif route
router.post('/create_justif', upload.single('file'),async (req, res) => {
  const file = req.file;
      const { message} = req.body;
      let tokene=req.headers.token
      let  studId=await token.getUserId(tokene)
    try {
      //look for the student first
       students.findById(studId).populate("ClassId").then((stud)=>{
        // Create a new justification
        Justi.create({
        message,
        PersoId:stud.ClassId.persoId,
        studId,
        file: {
          id: file.id,
          filename: file.filename,
          contentType: file.contentType
        }
      })
      .then(() => {
        res.status(200).send({ message: 'justification and file sent successfully' });
      })
      .catch(error => {
        console.error('Error creating justification:', error);
        res.status(400).send({ error: 'Error creating justification' });
      });
       })
    } catch (error) {
      console.error('Error handling file upload:', error);
      res.status(400).send({ error: 'Error handling file upload' });
    }
  });
  //Create new identi_service


module.exports=router