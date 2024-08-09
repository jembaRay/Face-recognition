const Router =require('express').Router()
const students = require('../models/students')
const attend=require('../models/Attendance_status')


Router.post('/student', (req, res) => {
    const { stuId } = req.body;
    const updates = {};
  
    if (req.body.First_name) {
      updates.First_name = req.body.First_name;
    }
    if (req.body.Last_name) {
      updates.Last_name = req.body.Last_name;
    }
    if (req.body.Email) {
      updates.Email = req.body.Email;
    }
    if (req.body.Telephone) {
      updates.Telephone = req.body.Telephone;
    }
    if (req.body.absences) {
      updates.absences = req.body.absences;
    }
  
    students.findOneAndUpdate(
      { _id: stuId },
      { $set: updates },
      { new: true }
    )
      .then((updatedStudent) => {
        if (!updatedStudent) {
          return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
  
  Router.post('/attendance_status', (req, res) => {
    const date=req.body.date ||new Date().toISOString().slice(0, 10);
    
    const userId = jwt.getUserId(token);
    const classId = req.body.classId;
    const studentId = req.body.studentId;
  
    const updates = {};
  
    if (req.body.First_period) {
      updates.First_period = req.body.First_period;
    }
    if (req.body.Second_period) {
      updates.Second_period = req.body.Second_period;
    }
    if (req.body.Third_period) {
      updates.Third_period = req.body.Third_period;
    }
  
    attend.updateOne(
      {
        id: studentId,
        date: date
      },
      { $set: updates },
      { upsert: true }
    )
      .then((result) => {
        if (result.modifiedCount > 0) {
          res.status(200).json({ message: 'Attendance record updated' });
        } else {
          res.status(200).json({ message: 'Attendance record created' });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
});



module.exports=Router