import mongoose from "mongoose";


const BlogSchema  = mongoose.Schema({
    title : {
        type: String,
        required: [true, 'title is required.'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'content is required.'],
        trim: true,
    }, 
    tags: {
        type: String,
        trim: true,
    }, 
    createdAt: {
        type: String,
        // required: [true, 'createdAt is required.'],
        trim: true,
    }, 
},
{
    timestamps: true,
})
// create model 
const BlogModel = mongoose.model('blog', BlogSchema);

// export section 
    export default BlogModel;