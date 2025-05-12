import  express  from 'express';
import BlogController from '../controller/BlogController.js';
import userAuthMiddleware from '../middleware/authMiddleware.js';

const blogRouter = express.Router();
blogRouter.post('/createPost',userAuthMiddleware, BlogController.createBlog)
blogRouter.get('/getAllPost', BlogController.getAllBlog)
blogRouter.get('/getOnePost/:id',BlogController.getOneBlog)
blogRouter.put('/editPost/:id',userAuthMiddleware, BlogController.editBlog)
blogRouter.delete('/deletePost/:id',userAuthMiddleware, BlogController.deleteBlog)

export default blogRouter;