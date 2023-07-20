const multer  = require('multer')
const path = require('path')

//image upload 
var Storage= multer.diskStorage({   //function define hua hai
    destination:"./public/imageupload/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });

const imageupload = multer({
    storage:Storage
}).single('image')

module.exports = imageupload;