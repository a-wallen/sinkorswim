import Mongoose = require("mongoose");
import { DataAccess } from "./../DataAccess";
import { IMemeModel } from "../interfaces/IMemeModel";

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

class MemeModel {
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
        memeId: {type: String, required: true, index: {unique: true}},
        userId: {type: String, required: true}, 
        totalVotes: {type: Number, required: true}, 
        imageUrl: {type: String, required: true}, // FIXME: how to format
        caption: {type: String}, 
        timePost: {type: Date}, 
        reports: {type: Number},
      },
      { collection: "memes" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IMemeModel>("Meme", this.schema);
  }

  public createPost(response:any, memeObject:IMemeModel) : Boolean {
    var operationSuccess = false;
    this.model.insertMany(memeObject)
      .then((result) => { 
        operationSuccess = true; 
        response.json(result); 
      })
      .catch((err) => { 
        response.json(err); 
      });
    return operationSuccess;
  }
  
  // get a post (via post id)
  public retrieveMemeDetails(response: any, filter:Object) : Promise<IMemeModel> {
    return this.model.find(filter)
      .then((result) => response.json(result))
      .catch((err) => response.json(err));
  }

  public getFeed(response:any, filter:Object) : IMemeModel[] {
    return this.model.find(filter)
      .then((result) => { response.json(result) })
      .catch((err) => { response.json(err) });
  }

  public updatePostDetails(response:any, memeObject:IMemeModel) {
    this.model.replaceOne({ memeId: memeObject["memeId"]}, memeObject)
      .then((result) => { 
        response.json(result); 
      })
      .catch((err) => { 
        response.json(err); 
      });
  }

  // TODO: This function is created to increment a post's vote 
  // Params: postId, voteValue 
  // returns: json
  

  // delete a post (via post id)
  // TODO: update user info by number of posts
  public deleteMeme(response: any, memeObject:Object) {
    var operationSuccess = false;
    this.model.deleteMany({memeId: memeObject["memeId"]})
      .then((result) => { 
        operationSuccess = true; 
        response.json(result); 
      })
      .catch((err) => { 
        response.json(err); 
      });
    return operationSuccess;
  }

}
export { MemeModel };
