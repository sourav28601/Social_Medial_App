var db  = require('../db/connectdb');
var User = db.user;
// const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


var checkUserAuth = async (req, res, next) => {
    const { token }  = req.cookies;
     console.log(token);
    try{
      // const token = req.cookies.jwt;
      // console.log(token);
      const { token }  = req.cookies;
      console.log(token);
      if(!token){
          res.redirect('/login')
      }else{
      const verifyuser = jwt.verify(token,'souravrajputrjitgwalior')
      // console.log(verifyuser);
      const user = await User.findOne({id:verifyuser.userid}) 
      req.user = user
      console.log(user);      
      next();
      }
  }catch(err){
      console.log(err);
  }
    // if (!token) {
    //   res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
    //   res.redirect('/login')
    // }else{
    // const decodedData = jwt.verify(token,'souravrajputrjitgwalior');
    // console.log(decodedData)
    // const user  = await User.findOne({id:decodedData.userid});
    // req.user = user
    // console.log(user)
    // next()
    // }
}

module.exports = checkUserAuth;

