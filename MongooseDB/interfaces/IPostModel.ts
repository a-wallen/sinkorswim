import Mongoose = require("mongoose");

interface IPostModel extends Mongoose.Document {
    postId: String;
    userId: String; 
    feedId: String; 
    totalVotes: Number; 
    caption: String; 
    timePost: Date; 
    imageUrl: String; // FIXME: how to format
    reports: Number;
}
export {IPostModel};
