var db  = require('../db/connectdb');
var User = db.user;
var Post = db.post;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController{

    static RegisterUser = async (req, res) => {
        const { name, email, password, confirmpassword } = req.body;
        // console.log(req.body);
        const user = await User.findOne({ where: { email: email } });
        if (user) {
          req.flash('error','this email is already registered')
            return res.redirect('/register')
          // res.send({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
        } else {
          if (name && email && password && confirmpassword) {
            if (password === confirmpassword) {
              try {
                const salt = await bcrypt.genSalt(10);
                const hashpassword = await bcrypt.hash(password, salt);
                const result = new User({
                  name: name,
                  email: email,
                  password: hashpassword,
                });
                await result.save();
                req.flash('error','Registration Successfully')
                return res.redirect('/login')
                // res.status(201).send({status: "success",message: "Registration Successfully 😃🍻"});
                //  res.redirect('/login');     
              } catch (err) {
                console.log(err);
              }
            } else {
              // res
              //   .status(200)
              //   .send({
              //     status: "success",
              //     message: "Password and Confirm password does not match",
              //   });
              req.flash('error','password does not match')
              return res.redirect('/register')
            }
          } else {
            // res.send({
            //   status: "success",
            //   message: "All the mentioned fields are required",
            // });
            req.flash('error','all field are required')
            return res.redirect('/register')
          }
        }
    };

    static verifylogin = async(req,res)=>{   
        // console.log(req.body);
        // res.render('user/registration')
        try{
            const{id,name,email,password}=req.body;
            // const id = req.params.id;
            // console.log(id);
           
            const user = await User.findOne({ where: { email: email } });
            req.session.user = user; 
            if(user!=null){
                const isMatch = await bcrypt.compare(password,user.password)
                if((user.email==email)&& isMatch){
                    // generate token
                    const token = jwt.sign({ userid:user.id },'souravrajputrjitgwalior');
                    // console.log(token);
                    res.cookie('token',token);
                    // req.session.email = email;
                    // res.status(200).send({ status: "success", message: "LOGIN SUCCESSFULLY WITH WEB TOKEN 😃🍻", "Token": token });
                    // res.render('display',{id:user.id})
                    res.redirect('/display');
                    // res.render('header',{id:user.id});
                }else{
                    req.flash('error','email and password does not match')
                    res.redirect('/login')
                    // res.send({ status: "failed", message: "email and password does not match 🙁🙁😥" });
                }
            }else{
                req.flash('error','you are not registered user')
                res.redirect('/login')
                // res.send({ status: "failed", message: "you are not registered user 😫😫😫" });
            }
        }catch(err){
            console.log(err);
        }
    }
    
  //   static logout = async(req,res)=>{
  //     try{
  //         res.clearCookie('jwt')
  //         res.redirect('/')
  //     }catch(err){
  //         console.log(err);
  //     }
  // }

  static oneToOne = async(req,res)=>{
    // let data = await User.findAll({});
    // console.log('hello');
    var data = await User.create({name:'Sourav',email:'sds@gmail.com',password:"123"})
    if(data && data.id){
          await Post.create({title:'TV','description':'HK LED TV','user_id':data.id});
      }

//   var data = await Post.findAll({
//     // include:Post
//     attributes:['title','description'],
//     include:[{
//        model:User,
//        as:'userDetails',
//        attributes:['name','email'],
//     }],
//     // where:{id:2}
// });
    res.status(200).json({data:data});
    // let data = {
    //   data:'one to one'
    // }
  }

  static oneToManyUser = async(req,res)=>{
    // let data = await User.findAll({});
    // console.log('hello');
    var data = await Post.create({title:'HK TV','description':'HK LED TV45','user_id':1})
    // if(data && data.id){
    //       await Post.create({title:'TV','description':'HK LED TV','user_id':data.id});
    //   }

  //   var data = await User.findAll({
  //     // include:Post
  //     attributes:['name','email'],
  //     include:[{
  //        model:Post,
  //        as:'postDetails',
  //        attributes:['title','description'],
  //     }],
  //     where:{id:2}
  // });
  //  
  res.status(200).json({data:data});

  
    // let data = {
    //   data:'one to one'
    // }
  }



}

module.exports = UserController;

