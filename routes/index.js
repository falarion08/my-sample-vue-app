
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

module.exports = upload