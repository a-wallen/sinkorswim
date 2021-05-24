import Mongoose = require("mongoose");
import { DataAccess } from "./../DataAccess";
import { IFeedModel } from "../interfaces/IFeedModel";
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

class FeedModel {
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
        feedId: {type: String, required: true, index: {unique: true}},
		date: {type: String, required: true}
      },
      { collection: "feeds" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IFeedModel>("Feed", this.schema);
  }

  public createFeed(response: any, feedObj: IFeedModel){
  	var query = this.model.create(feedObj, (err) => this.errorHandler(err));
	query.exec((feedObj, err) => {
		response.json(feedObj);
	})
  }

  // get a post (via post id)
  public retrieveFeed(response: any, filter: Object, limit:number) {
    var query = this.model.find(filter).limit(limit);
    query.exec((err, feed) => {
      response.json(feed);
    }); 
  }

  // delete a post (via post id)
  // TODO: update user info by number of posts
  public deleteFeed(response: any, filter: Object) {
    var query = this.model.deleteOne(filter);
    query.exec((err, post) => {
      if (err) {
        console.log("Error deleting post.");
      }
    });
  }

  // get all comments (via post id)
  public getAllFeeds(response: any, filter: Object) {
    var query = this.model.find({ postId: { filter: "postId" } });
    query.exec((err, post) => {
      response.json(post);
    });
  }
  private errorHandler(error: Error){

  }
}
export { FeedModel };
