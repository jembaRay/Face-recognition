const router=require('express').Router()
const { logSigmoid, log } = require('@tensorflow/tfjs');
const jwt = require('../Jwt/jwt');
const Attendance = require('../models/Attendance_status');
const Student=require('../models/students')


router.get(('/stats'),async (req,res)=>{
    let tokene = req.headers.token;
    let studId = jwt.getUserId(tokene);
    console.log({studId})
  let  studenId=studId ? studId: req.body.studId
  console.log({studenId})

 const stats= await getAttendanceStats(studenId)

 return res.send(stats)
})

async function getAttendanceStats(studentId) {
    try {
      const student = await Student.findById(studentId).populate('ClassId');
      if (!student) {
        return 'Student not found';
      }
  
      const attendanceRecords = await Attendance.find({ studId: studentId });
  
      let totalPeriodsPresent = 0;
      let totalPeriodsAbsent = 0;
      let totalDays = attendanceRecords.length;
      let daysAbsent = 0;
  
      attendanceRecords.forEach((record) => {
        if (record.First_period) {
          totalPeriodsPresent++;
        } else {
          totalPeriodsAbsent++;
        }
  
        if (record.Second_period) {
          totalPeriodsPresent++;
        } else {
          totalPeriodsAbsent++;
        }
  
        if (record.Third_period) {
          totalPeriodsPresent++;
        } else {
          totalPeriodsAbsent++;
        }
  
        if (!record.First_period && !record.Second_period && !record.Third_period) {
          daysAbsent++;
        }else if(!record.First_period && !record.Second_period && record.Third_period){
            daysAbsent++;
        }else if(!record.First_period && record.Second_period && !record.Third_period){
            daysAbsent++;
        }else if (record.First_period && !record.Second_period && !record.Third_period){
            daysAbsent++;
        }
      });
  
      const percentageDaysAttended = ((totalDays - daysAbsent) / totalDays) * 100;
      const percentageDaysAbsent = (daysAbsent / totalDays) * 100;
  
      return {
        totalPeriodsPresent,
        totalPeriodsAbsent,
        percentageDaysAttended: percentageDaysAttended.toFixed(2),
        percentageDaysAbsent: percentageDaysAbsent.toFixed(2),
        daysAbsent
      };
    } catch (error) {
      console.error(error);
      return 'Error retrieving attendance stats';
    }
  }
module.exports=router