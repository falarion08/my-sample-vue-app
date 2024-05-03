const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController.js');
const  upload = require('./index.js')

router.post('/',(req,res)=>{
    activities = activityController.getAllActivites();
    res.json({'message':'success','currentUserActivities':activities});
  });
  
router.post('/upload',upload.single('file'), (req,res)=>{

    const activity = {
      filename: req.file.originalname, ... req.body
    }
      activityController.addActivity(activity);
      res.json({"message":"success"});
  });
  
router.post('/delete/:id',(req,res)=>{
    activityController.deleteActivityByID(parseInt(req.params.id)); 
    console.log('Activity deleted successfully');
    res.json({'message':'success'});
  });
  
module.exports = router;