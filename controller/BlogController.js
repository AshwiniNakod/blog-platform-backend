import ErrorManagement from "../errorHandling/customeErrorManagementFunction.js";
import BlogModel from "../model/blogModel.js";

class BlogController {
    static createBlog = async(req,res, next) =>{
        try {
            const {title, content, tags } = req.body;
            if (!title || ! content) {
                const err = new ErrorManagement(`All fields are required.`, 400);
                return next(err);
            }
            const newBlog = new BlogModel({
                title: title,
                content: content,
                tags: tags,
                // createdAt: Date.now()
            })
            await newBlog.save()
            return res.status(201).json({
                status: 'success',
                message: 'New post created successfully.'
            });
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }
    static getAllBlog = async(req,res, next) =>{
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const totalPosts = await BlogModel.countDocuments();
            const posts = await BlogModel.find().skip(skip).limit(limit);

            const totalPages = Math.ceil(totalPosts / limit);

            res.json({
                message: posts,
                totalPages,
                currentPage: page
            });
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }
    static getOneBlog = async(req,res,next) =>{
        try {
            const post = await BlogModel.findById({_id: req.params.id})
            return res.status(200).json({
                status: 'success',
                message: post
            });
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }
    static editBlog = async(req,res, next) =>{
        try {
            const {title, content, tags } = req.body;
            const post = await BlogModel.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    $set: {
                        title: title,
                        content: content,
                        tags: tags
                    }
                },
                {
                    new: true
                }
            )
            return res.status(200).json({
                status: 'success',
                message: 'Post edited successfully.'
            });
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }
    static deleteBlog = async(req,res,next) =>{
        try {
            const post = await BlogModel.findByIdAndDelete(
                {_id: req.params.id},
            )
            return res.status(200).json({
                status: 'success',
                message: 'Post deleted successfully.'
            });
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }
  
}

export default BlogController;