const router = require("express").Router();
const jwt=require('../Jwt/jwt');
const Class = require("../models/Clas");
const students = require("../models/students");
const Personel=require('../models/Personel');
const justi=require('../models/Justification')
const Attendance_status=require('../models/Attendance_status')
const notif=require('../models/Notif')

router.get('/list_all_classes_of_perso',(req,res)=>{
    const token=req.headers.token
    const userid=jwt.getUserId(token) 

        Class.find({persoId:userid}).then((classes)=>{
            res.status(200).send({classes})

        }).catch((error)=>{
            console.log(error);
        })
})
router.get('/list_all_students_of_class',(req,res)=>{
    const {ClassId}=req.body
    students.find({ClassId}).then((student)=>{
        res.status(200).send({student})

    }).catch((error)=>{
        console.log(error);
        res.status(400).send({error})
    })    
})
router.get('/list_all_personels',(req,res)=>{
    Personel.find().then((perso)=>{
        res.status(200).send({perso})
    }).catch((error)=>{
        console.log(error);
        res.status(400).send({error})
    })   
})

//list all justification oof a month and for a particular student 
router.get('/list_all_justifications', (req, res) => {
    const { month, year } = req.body;
  
    if (!month || !year) {
      return res.status(400).send({ error: 'Month and year are required' });
    }
  
    const startDate = console.log(new Date(year, month - 1, 1));
    const endDate = new Date(year, month, 0);
  
    justi.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .then((justifications) => {
      res.status(200).send({ justifications });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error });
    });
  });
  // attendance for a particular student 
  router.get('/list_all_justifications_for_student', (req, res) => {
    const studId=req.body.studId
    justi.find({
        studId
      })
      .then((justifications) => {
        res.status(200).send({ justifications });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ error });
      });
  })
router.get('list_Attendance_status_for_student',(req,res)=>{
    const token=req.headers.token
    const userid=jwt.getUserId(token) 
    const date=req.body.date
    //attendance for a specific day
if (date) {
    
    const targetDate = new Date(date);

    Attendance_status.find({
        studId: userid,
      createdAt: {
        $gte: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()),
        $lt: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1)
      }
    })
    .sort({ createdAt: 1 })
    .then((attendanceRecords) => {
      res.status(200).send({ attendanceRecords });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
}else{
   //attendance for the whole days of a student
    Attendance_status.find({studId:userid}).sort({createdAt:1}).then((attend)=>{
        res.status(200).send({attend})
    }).catch((error)=>{
        res.status(400).send({error})
    })
}
})
router.get('list_Attendance_status_for_perso',(req,res)=>{
    const token=req.headers.token
    const userid=jwt.getUserId(token) 
    const date=req.body.date
    const classid=req.body.classid
    const target=new Date(date) 

    if (classid==null||date==null) {
        req.send('provide all data')
    }


//attendance for students of a class for a particular day
    if (classid) {
        Attendance_status.find({$and:[{'studId.ClassId.id':classid},
            {createdAt:{
                $gte:new Date(target.getFullYear(),target.getMonth(),target.getDate()),
                $lt:new Date(target.getFullYear(),target.getMonth(),target.getDate()+1)
                     }
            }]}).populate('studId').populate('studId.ClassId').then((attendance)=>{
                attendance.forEach((record) => {
                    console.log(`Student: ${record.studId.name}`);
                    console.log(`Class: ${record.studId.ClassId.name}`);
                    console.log(`Attendance Status: ${record.status}`);
                  });
                res.status(200).send({attendance})
            }).catch((error)=>{
                res.status(400).send({error})
            })
    } else {
        
   //attendance for the whole days of a student
    Attendance_status.find({studId:userid}).sort({createdAt:1}).then((attend)=>{
        res.status(200).send({attend})
    }).catch((error)=>{
        res.status(400).send({error})
    })
    }
})
//all nitifications of a specific student
router.get('/list_notif_for_all',(req,res)=>{
const {studId,PersoId}=req.body
//for student
if (studId) {
    notif.find({studId}).then((note)=>{
        res.status(200).send({note})
    
    }).catch((error)=>{
        res.status(400).send({error})
    })    
}
//for personel
if (PersoId) {
    notif.find({studId}).then((note)=>{
        res.status(200).send({note})
    }).catch((error)=>{
        res.status(400).send({error})
    }) 
}
})

router.get('',(req,res)=>{

})
router.get('',(req,res)=>{

})
router.get('',(req,res)=>{

})



module.exports=router;