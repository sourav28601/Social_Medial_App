// const multer  = require('multer')
// const path = require('path')

// //image upload 
// var Storage= multer.diskStorage({   //function define hua hai
//     destination:"./public/imageupload/",
//     filename:(req,file,cb)=>{
//       cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
//     }
//   });

// const imageupload = multer({
//     storage:Storage
// }).single('image')

// module.exports = imageupload;
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

// S3 Config
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload directly to S3
const imageupload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(
        null,
        "imageupload/" +
          file.fieldname +
          "_" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
}).single("image");

module.exports = imageupload;

