import Mongoose = require("mongoose");

interface ICommentModel extends Mongoose.Document {
    postId: Number; 
    userId: Number; 
    commentId: Number; 
    content: String; 
    likes: Number; 
    timestamp: Date
}
export {ICommentModel};
