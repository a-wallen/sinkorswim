import Mongoose = require("mongoose");

interface IPostModel extends Mongoose.Document {
    postId: Number;
    userId: Number; 
    feedId: Number; 
    totalVotes: Number; 
    caption: String; 
    timePost: Date; 
    imageUrl: String; // FIXME: how to format
    reports: Number;
}
export {IPostModel};
