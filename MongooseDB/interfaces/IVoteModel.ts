import Mongoose = require("mongoose");

interface IVoteModel extends Mongoose.Document {
    voteId: String; 
    postId: String;
    userId: String; 
    voteValue: Number; 
    timestamp: Date; // same format as comment model
}
export {IVoteModel};