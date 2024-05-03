const users = require('../controllers/userController.js');
const express = require('express');
const router = express.Router();


router.post('/',(req,res)=>{
    console.log('router3')

    const availableUesrs = users.getAllUsers();
    res.json({'message':'success', 'users':availableUesrs});
});

router.post('/update/:userID',(req,res)=>{
    const userID = parseInt(req.params.userID); 
    users.updateUserByID(userID,req.body)
    console.log('User update successful');
  
    res.json({'message':'success'});
  });
  
router.post('/delete/:userID',(req,res)=>{
    const userID = parseInt(req.params.userID);
    users.deleteUserByID(userID);
    res.json({'message':'success'})
  });

module.exports= router;
  