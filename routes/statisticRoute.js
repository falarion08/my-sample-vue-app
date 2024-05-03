const express = require('express');
const router = express.Router();
const { getStatistics } = require('../controllers/exerciseTypesController.js');

router.post('/:ownerID',(req,res)=>{
    const ownerID = parseInt(req.params.ownerID);
    const stats = getStatistics(ownerID);
  
    res.json({'message':'success','stats':stats});
  })
  
module.exports=router;