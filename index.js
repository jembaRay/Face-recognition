const exp=require('express')
const app=exp()
const bodyPars=require('body-parser')
const cors=require('cors')
const mongo= require('mongoose')
const Grid = require('gridfs-stream');
const RegStud=require('./routes_controllers/RegStud')
const create_route=require('./routes_controllers/create_route')
const list_route=require('./routes_controllers/list_route')
const Auth=require('./routes_controllers/Auth')
const Update_route=require("./routes_controllers/Update_route")


mongo.connect('mongodb://localhost:27017/facerecognition').then(()=>{
    console.log("mongo connected")
})
app.use(bodyPars.urlencoded({extended:true}))
app.use(bodyPars.json())
app.use(exp.json())
app.use(cors(
    {
      origin: true,
      credentials: true
    }
))

app.use('/',RegStud)
app.use('/',create_route)
app.use('/',Auth)
app.use('/',Update_route)
app.use('/',list_route)
let gfs;
const conn = mongo.connection;
conn.once('open', () => {
  // Initialize GridFS
  gfs = Grid(conn.db, mongo.mongo);
  gfs.collection('uploads');
});

app.listen(4000,(req,res)=>{
console.log('face recognition good');
})

