import Mongoose = require("mongoose");
import { DataAccess } from "./../DataAccess";
import { ICommentModel } from "../interfaces/ICommentModel";
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

/*
Comments model
CRUD
create: post a comment
read: view a comment
update: like a comment, edit a comment
delete: delete a comment 
*/

class CommentModel {
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
        postId: String,
        userId: String,
        commentId: String,
        content: String,
        likes: Number,
        timestamp: Date,
      },
      { collection: "comments" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<ICommentModel>(
      "Comments",
      this.schema
    );
  }

  // view a comment
  public retrieveComment(response: any, filter: Object) {
    var query = this.model.findOne(filter);
    query.exec((err, comment) => {
      if (err) {
        console.log("Error retrieving comment.");
      }
      response.json(comment);
    });
  }

  // delete a comment
  public deleteComment(response: any, filter: Object) {
    var query = this.model.deleteOne(filter);
    query.exec((err, comment) => {
      if (err) {
        console.log("Error deleting comment.");
      }
    });
  }

  // like a comment
  public likeComment(response: any, filter: Object) {
    var query = this.model.findOne(Object);
    query.likes += 1;
    query.save();
  }

  // get all comments (via post id)
  public getAllComments(response: any, filter: Object) {
    var query = this.model.find(filter);
    query.exec((err, post) => {
      response.json(post);
    });
  }
}
export { CommentModel };
