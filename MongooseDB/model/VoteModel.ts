import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IVoteModel} from '../interfaces/IVoteModel';
import { json } from "body-parser";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

/* CRUD methods:
Create: upvote or downvote a meme (create a vote and update a meme)
Read: to make sure a user hasn't voted twice on a meme 
Update: user wants to toggle their vote (update a vote and update a meme)
Delete: delete a vote (delete vote and update a meme) 
*/

// TODO: to create access to the post collections, do I need to add another
// db connection similar to line 42/43? 

class VoteModel {
    public schema:any;
    public innerSchema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                voteId: { type:String, required:true, index: { unique:true }},
                postId: { type:String, required:true },
                userId: { type:String, required:true },
                voteValue: { type:Number, required:true },
                timestamp: { type:String, required:true },
            }, {collection: 'votes'}
        );
    }

    public createModel(): void {
      this.model = mongooseConnection.model<IVoteModel>("Votes", this.schema);
    }

    // create vote: create a vote obj and update a meme/post
    // pre: user hasn't voted on this post before 
    // post: vote create and post changed 
    public createVote(response: any, voteObject: IVoteModel) {
        this.model.insert(voteObject) 
            .then((result) => { response.json(result); })
            .catch((err) => { response.json(err); }); 

        // this.model.update({ postId: postObject["postId"] }, 
        //     { $inc: { totalVotes: voteObject["voteValue"] }})
        //     .then((result) => { response.json(result); })
        //     .catch((err) => { response.json(err); }); 
    }

    // delete vote: deletes a vote obj and updates a meme/post
    // pre: none
    // post: post has one fewer votes 
    public deleteVote(response: any, voteObject: IVoteModel) {
        // this.model.updateOne({ postId: postObject["postId"] }, 
        //     { $inc: { totalVotes: -voteObject["voteValue"] }})
        //     .then((result) => { response.json(result); })
        //     .catch((err) => { response.json(err); }); 

        this.model.deleteOne({ voteId: voteObject["voteId"] })
            .then((result) => { response.json(result); })
            .catch((err) => { response.json(err); }); 
    }
}
export { VoteModel }; 