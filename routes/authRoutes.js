const upload=require('./index.js')
const express = require('express');
const router = express.Router();
const users = require('../controllers/userController.js');
const jwt = require('jsonwebtoken');

router.post('/signup',upload.single('file'), (req,res)=>{
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
  
router.post('/login', (req,res)=>{
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

module.exports = router;
  
  
  