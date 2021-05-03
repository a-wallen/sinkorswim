import Mongoose = require("mongoose");

interface ICommentModel extends Mongoose.Document {
    postId: String; 
    userId: String; 
    commentId: String; 
    content: String; 
    likes: Number; 
    timestamp: Date
}
export {ICommentModel};
