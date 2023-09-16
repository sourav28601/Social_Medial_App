const express = require('express');
const router = express.Router();
const FrontController = require('../controllers/FrontController');
const UserController =  require('../controllers/UserController');
const PostController = require('../controllers/PostController');
const checkUserAuth = require('../middleware/auth');
const image_middleware = require('../middleware/image_middleware');
const CommentController = require('../controllers/CommentController');

//FrontController
router.get('/',checkUserAuth,FrontController.post);
// router.get('/mypost',checkUserAuth,FrontController.MyPost);
router.get('/login',FrontController.login);
router.get('/register',FrontController.register);
router.get('/display',checkUserAuth,FrontController.display);
router.get('/mypost/:id',checkUserAuth,FrontController.MyPost);
// router.get('/addpost',checkUserAuth,FrontController.post);
router.get('/comment/:id',FrontController.comment);


// UserController
router.post('/userregister',UserController.RegisterUser);
router.post('/userlogin',UserController.verifylogin);
// router.get('/oneToOne',UserController.oneToOne);
// router.get('/one-to-many',UserController.oneToManyUser);


// PostController
router.post('/post',checkUserAuth,image_middleware,PostController.CreatePost);
router.get('/editpost/:id',checkUserAuth,PostController.EditPost);
router.post('/updatepost/:id',checkUserAuth,image_middleware,PostController.UpdatePost);
router.get('/deletepost/:id',checkUserAuth,PostController.DeletePost);
// router.get('/one-to-many-comment',PostController.oneToManyUser);

// CommentController
router.get('/one-to-one-comment',CommentController.oneToOne);
router.post('/addcomment/:id',checkUserAuth,CommentController.addComment);
router.get('/editcomment/:id',checkUserAuth,CommentController.EditComment);
router.post('/updatecomment/:id',checkUserAuth,CommentController.UpdateComment);
router.get('/deletecomment/:id',checkUserAuth,CommentController.DeleteComment);



module.exports = router;
