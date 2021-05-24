import Mongoose = require("mongoose");
import { DataAccess } from "./../DataAccess";
import { IVoteModel } from "../interfaces/IVoteModel";
import { json } from "body-parser";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

/* CRUD methods:
Create: upvote or downvote a meme (create a vote and update a meme)
Read: to make sure a user hasn't voted twice on a meme 
Update: user wants to toggle their vote (update a vote and update a meme)
Delete: delete a vote (delete vote and update a meme) 
*/

class VoteModel {
  public schema: any;
  public innerSchema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        voteId: { type: String, required: true, index: { unique: true } },
        memeId: { type: String, required: true },
        userId: { type: String, required: true },
        voteValue: { type: Number, required: true },
        timestamp: { type: String, required: true },
      },
      { collection: "votes" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IVoteModel>("Votes", this.schema);
  }

  // create vote: create a vote obj and update a meme/post
  // pre: user hasn't voted on this post before
  // post: vote created
  public createVote(response: any, voteObject: IVoteModel) {
    this.model
      .insertMany(voteObject)
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        response.json(err);
      });
  }

  //     // create vote: create a vote obj and update a meme/post
  // // pre: user hasn't voted on this post before
  // // post: vote created
  // public createVote(response: any, voteObject: IVoteModel) {
  //     this.model.insertMany(voteObject)
  //         .then((result) => { response.json(result); })
  //         .catch((err) => { response.json(err); });
  // }

  // delete vote: deletes a vote obj and updates a meme/post
  // pre: none
  public deleteVote(response: any, voteObject: IVoteModel) {
    this.model
      .deleteOne({ voteId: voteObject["voteId"] })
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        response.json(err);
      });
  }
}
export { VoteModel };
