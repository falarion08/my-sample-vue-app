const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config() 
const users = require('./controllers/userController.js');
const path = require('path');
const jwt = require('jsonwebtoken');
const activityController = require('./controllers/activityController.js');
const { getStatistics } = require('./controllers/exerciseTypesController.js');

const router = express.Router();

// Middlware for file upload 
multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req,res,cb){
    cb(null,'./uploads');
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
})

const upload = multer({storage});


const app = express();
const PORT = process.env.PORT;

const corsOption = {
  origin: 'http://localhost:5173'
}


// Middlewares 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOption));
app.use(express.static('uploads'));

app.post('/signup',upload.single('file'), (req,res)=>{
  let user = {profile_pic: req.file.originalname, ...req.body};
  
  try{
    users.add(user);

    res.status(201).json({'message':'success'}); 
    console.log('Successfuly added user to the database');
  } catch {
    console.log('Unable to add user to the database');
    res.status(500).json({'message':'Username already exists in the database'});
  }

  
});

app.post('/login', (req,res)=>{
  const loginCredentials = req.body; 
  const result = users.getByUsername(loginCredentials.username);

  if (result)
  {

    if(result.password === loginCredentials.password){
      const token = jwt.sign({username: loginCredentials.username}, process.env.SECRET_KEY);
      res.status(200);
      res.json({'message':'success','authToken':token,'user':result});
      return;
      }
      
  }
  res.status(500); 
  res.json({'message':'invalid username or password'})
});

app.get('/Activity',(req,res)=>{
  activities = activityController.getAllActivites()
  res.json({'message':'success','currentUserActivities':activities});
});

app.post('/Activity',upload.single('file'), (req,res)=>{

  const activity = {
    filename: req.file.originalname, ... req.body
  }
    activityController.addActivity(activity);
    res.json({"message":"success"});
});

app.post('/activity/delete/:id',(req,res)=>{
  activityController.deleteActivityByID(parseInt(req.params.id)); 
  console.log('Activity deleted successfully');
  res.json({'message':'success'});
});

app.get('/search',(req,res)=>{
    const availableUesrs = users.getAllUsers();
    res.json({'message':'success', 'users':availableUesrs});
});

app.post('/update/user/:userID',(req,res)=>{
  const userID = parseInt(req.params.userID); 
  users.updateUserByID(userID,req.body)
  console.log('User update successful');

  res.json({'message':'success'});
});

app.post('/delete/user/:userID',(req,res)=>{
  const userID = parseInt(req.params.userID);
  users.deleteUserByID(userID);
  res.json({'message':'success'})
});

app.get('/statistics/:ownerID',(req,res)=>{
  const ownerID = parseInt(req.params.ownerID);
  const stats = getStatistics(ownerID);

  res.json({'message':'success','stats':stats});
})



app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});