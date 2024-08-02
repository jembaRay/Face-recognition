const router=require('express').Router()
const stud=require('../models/students')
const faceapi = require('face-api.js');
const bcrypt=require('bcrypt');
const Clas = require('../models/Clas');
const canvas = require('canvas');
const  axios = require('axios');
const students = require('../models/students');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const token=require('../Jwt/jwt');
const { Console } = require('console');

// // Configure multer-gridfs-storage
// const storage = new GridFsStorage({
//     url: 'mongodb://localhost:27017/facerecognition',
//     file: (req, file) => {
//       return {
//         bucketName: 'images',
//         filename: `${Date.now()}${path.extname(file.originalname)}`
//       };
//     }
//   });
   //const tf=require('@tensorflow/tfjs-node')


// Create the upload middleware
const upload = multer({ storage: multer.memoryStorage() });
  


router.post('/create_student', upload.single('image'), async (req, res) => {
    const tokene=req.headers.token
    const PersoId= token.getUserId(tokene)
  console.log('image recieved');
  const {First_name,Last_name,Email,Telephone,password,Class_name,image}=req.body
  console.log({First_name,Last_name,Email,Telephone,password,Class_name})
  try {
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }
    const { buffer, originalname } = req.file;
console.log(buffer);
//     // Call the Python script via Flask server
    
    const response = await axios.post('http://localhost:5000/recognize_face', buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });
   console.log(response.data.encodings);
    // Send the response back to the client
    //res.status(200).json(response.data);

   stud.findOne({$or:[{Email},{Telephone}]}).then((existing)=>{
      if (existing) {
         let errorMessage='';
         if (existing.Email === Email) {
             errorMessage = 'Email already exists.';
          } else if (existing.Telephone === Telephone) {
             errorMessage = 'Telephone number already exists.';
         }
           return res.status(400).send({err:errorMessage})
            
     } else {
          
       bcrypt.hash(password,6,(err,bcrypted)=>{
            if (err) {
                 res.status(500).send(err)
             }
                Clas.find({Name:Class_name}).then((clas)=>{
                     if(!clas){
                         res.status(300).json('no class as such')
                   }
                     stud.create({
                        First_name,
                        Last_name,
                         Email, 
                         Telephone,
                         Password: bcrypted,
                         PersoId,
                         descriptor:response.data.encodings,
                      ClassId:clas.id
                    }).then((student)=>{
                        res.status(200).send({student})
                    })
                })
         })
     }
   })
   .catch((error)=>{


   })
   
   } catch (error) {
     //console.error(error);
     res.status(500).send('Error processing image');
   } 
});


router.get('/hello',(req,res)=>{
res.send({"hey":'good end point'})
})




module.exports=router





// const face1 = document.getElementById('face')
//const face1 = await faceapi.fetchImage('https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/220px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg')

//we grab the image, and hand it to detectAllFaces method
//let faceAIData = await faceapi.detectAllFaces(face1).withFaceLandmarks().withFaceDescriptors().withAgeAndGender()
//console.log(faceAIData)
//const detections = await faceapi.detectSingleFace(face1, faceapi.TinyYolov2Options({
  // inputSize: 416,
  //  scoreThreshold: 0.5
  //}));
 
  // try {
  //     const {First_name,Last_name,Email,Telephone,password,confirmPass,Class_name}=req.body;
  //   const { buffer: imageBuffer } = req.file;
    
  //     if(!imageBuffer){
  //         return res.status(400).json({ error: 'No image' });
  //     }
  //     console.log({"image":imageBuffer});
  //     faceapi.env.monkeyPatch({ Canvas: canvas.Canvas, Image: canvas.Image })
  //     await faceapi.nets.ssdMobilenetv1.loadFromDisk('./weights');
  //     // Load the image and perform face detection
  //     const img = new canvas.Image();
  //     await new Promise((resolve, reject) => {
  //       img.onload = resolve;
  //       img.onerror = reject;
  //       img.src = 'C:\\Users\\Jemba\\Desktop\\Face recognition\\routes_controllers\\face-for-test.jpg';
  //     });  // Detect a single face
    
  //   const detections = await faceapi.detectSingleFace(img, faceapi.TinyYolov2Options({
  //     inputSize: 416,
  //     scoreThreshold: 0.5
  //   }));

  //   if (!detections) {
  //     return res.status(400).json({ error: 'No face detected in the image' });
  //   }
  //   // Compute the face descriptor
  //   const descriptor = await faceapi.computeFaceDescriptor(imageBuffer, detections.landmarks);

  //   // stud.findOne({$or:[{Email},{Telephone}]}).then((existing)=>{
  //   //   if (existing) {
  //   //       let errorMessage='';
  //   //       if (existing.Email === Email) {
  //   //           errorMessage = 'Email already exists.';
  //   //         } else if (existing.Telephone === Telephone) {
  //   //           errorMessage = 'Telephone number already exists.';
  //   //         }
  //   //         return res.status(400).send({err:errorMessage})
            
  //   //   } else {
          
  //   //       bcrypt.hash(password,6,(err,bcrypted)=>{
  //   //           if (err) {
  //   //               res.status(500).send(err)
  //   //           }
  //   //               Clas.find({Name:Class_name}).then((clas)=>{
  //   //                   if(!clas){
  //   //                       res.status(300).json('no class as such')
  //   //                   }
  //   //                   stud.create({
  //   //                       First_name,
  //   //                       Last_name,
  //   //                       Email, 
  //   //                       Telephone,
  //   //                       Password: bcrypted,
  //   //                       descriptor,
  //   //                       ClassId:clas.id
  //   //                   })
  //   //               })
  //   //       })
  //   //   }
  //   // }).catch((error)=>{


  //   // })

  //  console.log({ descriptor });
  // } catch (error) {
  //   console.error('Error recognizing face:', error);
  //   return res.status(500).json({ error: 'Error recognizing face' });
  // }