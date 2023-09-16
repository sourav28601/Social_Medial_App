var db  = require('../db/connectdb');
var Post = db.post;
var Comment = db.comment;
var User = db.user;

class FrontController{
    static post = async(req,res)=>{    
        // res.send("hello World! 123")
        try{
            const user = req.session.user;
            // const result = await User.findOne({where:{id:req.params.id}})
            // console.log(result)
            res.render('post',{user})
        }catch(err) 
        {
          console.log(err)
        }
        res.render('post');
    }

  
    static login =(req,res)=>{
        try {
            res.render('login',{message:req.flash('error')})
        } catch (error) {
            console.log(error);  
        }
    }
    
    static register =(req,res)=>{
        try {
            res.render('register',{message:req.flash('error')})
        } catch (error) {
            console.log(error);  
        }
        // res.send("hello World! 123")
        res.render('register');
    }

    // static display =(req,res)=>{
    //     // res.send("hello World! 123")
    //     const allposts = await Post.findAll();
    //     res.render('display');
    // }

    static MyPost = async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(userId);
            const mypost = await Post.findAll({where: { user_id: userId },include: [
                { 
                  model: Comment,
                  include: [
                    {
                      model: User
                    }
                  ]
                }
            ]});
            res.render('postdisplay',{mypost})
          } catch(err){
            console.log(err)
        }
    }

    static display = async (req, res) => {
        try {
            const user = req.session.user;
            // console.log(user.id);
            const allposts = await Post.findAll({include: [
                { 
                  model: Comment,
                  include: [
                    {
                      model: User
                    }
                  ]
                }
            ]});
            // res.status(200).json({success: true, allposts})
            res.render('display',{user,allposts});
        }catch(err){
            console.log(err)
        }
    }

    static comment = async (req, res) => {

        try {
            const user = req.session.user;
            const postId = req.params.id;
            console.log(postId);
            res.render('comment',{user,postId}) 

        }catch(err){
            console.log(err)
        }

       
        // const data = await User.findOne({
        //     where:{
        //         id:req.params.id
        //     }
        // });
        // res.status(200).json({data:data})
        // try {
        //     const allposts = await Post.findOne({
        //         where:{
        //             id:req.params.id
        //         }
        //     });          
      
        // } catch (err) {
        //     console.log(err)
        // } 
    }

}

module.exports = FrontController;
