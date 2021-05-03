import Mongoose = require("mongoose");
import { DataAccess } from "./../DataAccess";
import { IPostModel } from "../interfaces/IPostModel";
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

/* Post Methods
CRUD
Create: create a post
read: getting posts: getting posts by feed, by a user
read: view comments by postId... with a collection? 
- query feed collection for feed (by current day), that object has a
feedId that we can use as a query parameter for the post collection 
- find feedId given the current day --> from feedId, find the posts with that feed id
^^^ (NOT A PART OF A CLASS... RN) 
- get current feedID byt he day for a new post 
update: vote, update caption, get reported 
delete: delete a post (done by a user or when a user account gets deleted?)
*/

class PostModel {
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
        feedId: String,
        totalVotes: Number,
        caption: String,
        timePost: Date,
        imageUrl: String,
        reports: Number,
      },
      { collection: "posts" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IPostModel>("Post", this.schema);
  }

  // get a post (via post id)
  public retrievePost(response: any, filter: Object) {
    var query = this.model.findOne(filter);
    query.exec((err, post) => {
      response.json(post);
    });
  }

  // vote on a post (via post id)
  public voteForPost(response: any, voteValue: Number, filter: Object) {
    var query = this.model.findOne(filter);
    query.totalVotes += voteValue;
    query.save();
  }

  // delete a post (via post id)
  // TODO: update user info by number of posts
  public deletePost(response: any, filter: Object) {
    var query = this.model.deleteOne(filter);
    query.exec((err, post) => {
      if (err) {
        console.log("Error deleting post.");
      }
    });
  }

  // get all comments (via post id)
  public getAllComments(response: any, filter: Object) {
    var query = this.model.find({ postId: { filter: "postId" } });
    query.exec((err, post) => {
      response.json(post);
    });
  }

  /*
    public retrieveTasksDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveTasksCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerTaskList) => {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerTaskList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of tasks: ' + innerTaskList.tasks.length);
                    response.json('{count:' + innerTaskList.tasks.length + '}');
                }
            }
        });
    }
    */
}
export { PostModel };
