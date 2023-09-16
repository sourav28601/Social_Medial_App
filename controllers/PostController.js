var db  = require('../db/connectdb');
var Post = db.post;
var Comment = db.comment;
var User = db.user;


class PostController {

  static oneToOne = async(req,res)=>{
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
    res.status(200).json({data:data});
    // let data = {
    //   data:'one to one'
    // }
  }

  static CreatePost = async (req, res) => {
    try{
        const{title,description,status,user_id}=req.body;
        const data = await Post.create({
            title:title,
            description:description,
            status:status,
            // image:image,
            image:req.file.filename,
            user_id:user_id
        })
      // if(data && data.id){
      //   await Comment.create({comment:comment,'post_id':data.id});
      // }
        await data.save();
        // res.status(200).json({data:data});
        // res.render('/display',{data:data}) 
        return res.redirect('/display');
        // res.status(201).json({success: true,data})
    }catch(err){
        console.log(err)
    }
  };
  
   
  static DisplayAllPosts = async (req, res) => { 
    try {
        const allposts = await Post.findAll({
              attributes:['title','description','image'],
              include:[{
                 model:Comment,
                 attributes:['comment'],
              }
            ]});
        // console.log(allposts.Comments.comment);
        // res.status(200).json({success: true, allposts})
        res.render('/display',{allposts:allposts}) 
    } catch (err) {
        console.log(err)
    }
  };
  
  static EditPost = async(req,res) =>{
    // console.log(req.params.id)
    try{
        const result = await Post.findOne({where:{id:req.params.id}})
        console.log(result)
        res.render('editpost',{data:result})
    }catch(err) 
    {
      console.log(err)
    }
  };

  static UpdatePost = async (req, res) => {
    // console.log('hello');
    // console.log(req.params.id);
    const { title, description,image,status} = req.body;
    try{
        if(req.file){
            var imagefile = req.file.filename
        }
        const data = await Post.update({
            title:title,
            description:description,
            image:imagefile,
            status:status
        },{where:{
            id: req.params.id,
          }})
        // console.log(data)
        return res.redirect('/display')
        // res.status(201).json({success: true,message: "post updated successfully",data})
    }catch(err) 
    {
     console.log(err)
    }
  };

  static DeletePost = async (req, res) => {
    // console.log(req.params.id);
    try {
      const post = await Post.destroy({where:{id:req.params.id}});
      res.redirect('/display');
      // console.log(post)
      // if (!post) { 
      //     // return res.status(500).send({ status: "unsucess", message: "Post not found" })
      // }
      // res.status(201).json({ status: "success", success: true, message: "Delete Successfully", post })
  } catch (err) {
      console.log(err)
  }
  };

}

module.exports = PostController;
