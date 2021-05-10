import Mongoose = require("mongoose");
import { DataAccess } from "./../DataAccess";
import { IPostModel } from "../interfaces/IPostModel";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

/* Post Methods
// TODO: update user info by number of posts 
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
        postId: {type: String, required: true, index: {unique: true}},
        userId: {type: String, required: true}, 
        totalVotes: {type: Number, required: true}, 
        imageUrl: {type: String, required: true}, // FIXME: how to format
        caption: {type: String}, 
        timePost: {type: Date}, 
        reports: {type: Number},
      },
      { collection: "posts" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IPostModel>("Post", this.schema);
  }

  public createPost(response:any, postObject:IPostModel){
      this.model.insertMany(postObject)
        .then((result) => { response.json(result); })
        .catch((err) => { response.json(err); });
  }
  

  // get a post (via post id)
  public retrievePostDetails(response: any, filter:Object) {
    var query = this.model.findOne(filter);
    query.exec((err, post) => {
      response.json(post);
    });
  }

  public getFeed(response:any, filter:Object) {
    this.model.find(filter)
      .then((result) => { response.json(result) })
      .catch((err) => { response.json(err) });
  }

  public updatePostDetails(response:any, postObject:IPostModel){
    this.model.replaceOne({ postId: postObject["postId"]}, postObject)
      .then((result) => { response.json(result); })
      .catch((err) => { response.json(err); });
  }

  // delete a post (via post id)
  // TODO: update user info by number of posts
  public deletePost(response: any, postObject:Object) {
    this.model.deleteMany({postId: postObject["postId"]})
      .then((result) => { response.json(result); })
      .catch((err) => { response.json(err); });
  }

}
export { PostModel };
