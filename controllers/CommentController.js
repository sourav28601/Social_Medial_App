var db  = require('../db/connectdb');
const { comment } = require('./FrontController');
var Post = db.post;
var Comment = db.comment;

class CommentController{
    
    // static AddComment =(req,res)=>{
    //     // res.send("hello World! 123")
    //     // res.render('post');
    // }

    static oneToOne = async(req,res)=>{
        // let data = await User.findAll({});
        // console.log('hello');
        // var data = await Post.create({title:'TV POST 12123',description:'HK LED TV 123'})
        // if(data && data.id){
        //       await Comment.create({comment:'HK LED TV','post_id':data.id});
        //   }
        
      var data = await Post.findAll({
        // include:Post
        attributes:['title','description'],
        include:[{
           model:Comment,
           as:'postDetails',
           attributes:['comment'],
        }],
        where:{id:2}
    });
        res.status(200).json({data:data});
        // let data = {
        //   data:'one to one'
        // }
    }
    
    static addComment =  async(req,res)=>{
        // console.log(req.params.id);
        // const user = req.session.user;
        // console.log(user);
    
        // const {comment} = req.body;
        // console.log(comment);
        const post_id = req.params.id;
          
        try {
        const{comment,user_id}=req.body;
        const data = await Comment.create({
            comment:comment,
            user_id:user_id,
            post_id:post_id,
        });
        // console.log(data);
        await data.save();
        return res.redirect('/display')
        // res.status(200).json({data:data});
        // res.redirect(`${post_id}/comments`);
        } catch (error) {
        res.status(500).json({ error: 'Error creating comment.'});
        }
        // let data = await User.findAll({});
        // console.log('hello');
        // var data = await Post.create({title:'TV POST 12123',description:'HK LED TV 123'})
        // if(data && data.id){
        //       await Comment.create({comment:'HK LED TV','post_id':data.id});
        //   }
    

    //   var data = await Post.findAll({
    //     // include:Post
    //     attributes:['title','description'],
    //     include:[{
    //        model:Comment,
    //        as:'postDetails',
    //        attributes:['comment'],
    //     }],
    //     where:{id:2}
    // });

    // try{
    //     const {comment} = req.body;
    //     // const{title,description,status,image,comment}=req.body;
    //     const data = await Post.create({
    //         title:'SDD',
    //         description:'Hdd type'
    //     })
    // //   const comment=req.body;
    //   if(data && data.id){
    //     var cdata = await Comment.create({comment:comment,'post_id':data.id});
    //   }
    //     await cdata.save();
    //     res.status(200).json({cdata:cdata});
    //     // return res.redirect('/display')
    //     // res.status(201).json({success: true,data})
    // }catch(err){
    //     console.log(err)
    // }
        // res.status(200).json({data:data});
        // let data = {
        //   data:'one to one'
        // }
    }
    
    static DisplayComment = async(req,res)=>{
        try {
            const allposts = await Post.findAll({
                  attributes:['title','description','image'],
                  include:[{
                     model:Comment,
                    //  as:'postDetails',
                     attributes:['comment'],
                  }]});
            // console.log(allposts.Comments.comment);
            res.status(200).json({success:true, allposts})
            // res.render('/display',{allposts:allposts}) 
        } catch (err) {
            console.log(err)
        }

    //      try {
    //     const allcomments = await Post.findAll({
    //           attributes:['title','description','image'],
    //           include:[{
    //              model:Comment,
    //             //  as:'postDetails',
    //              attributes:['comment'],
    //           }]});
    //     console.log(allcomments);
    //     // res.status(200).json({success: true, allposts})
    //     res.render('/display',{allposts:allposts}) 
    // } catch (err) {
    //     console.log(err)
    // }
        
    } 

    static EditComment =async(req,res)=>{
        try {
             const result = await Comment.findOne({where:{id:req.params.id}})
        // console.log(result)
        res.render('editcomment',{data:result})
            // res.render('',{message:req.flash('error')})
        } catch (error) {
            console.log(error);  
        }
    }

    static UpdateComment = async(req,res)=>{
        // console.log('hello');
       try{
        // const user = req.session.user;
        const {comment} = req.body
        // console.log(comment);
        const data = await Comment.update({comment:comment},{where:{
            id: req.params.id,
        }})
        // console.log(data)
        res.redirect('/display')
        // res.status(201).json({success: true,message: "post updated successfully",data})
    }catch(err) 
    {
     console.log(err)
    }
    }

    static DeleteComment =async(req,res)=>{
        try {
            const post = await Comment.destroy({where:{id:req.params.id}});
            res.redirect('/display');
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = CommentController;
