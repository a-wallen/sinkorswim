"use strict";
exports.__esModule = true;
exports.PostModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
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
var PostModel = /** @class */ (function () {
    function PostModel() {
        this.createSchema();
        this.createModel();
    }
    PostModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            postId: { type: String, required: true, index: { unique: true } },
            userId: { type: String, required: true },
            totalVotes: { type: Number, required: true },
            imageUrl: { type: String, required: true },
            caption: { type: String },
            timePost: { type: Date },
            reports: { type: Number }
        }, { collection: "posts" });
    };
    PostModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Post", this.schema);
    };
    PostModel.prototype.createPost = function (response, postObject) {
    };
    // get a post (via post id)
    PostModel.prototype.retrievePostDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, post) {
            response.json(post);
        });
    };
    PostModel.prototype.getFeed = function (response, filter) {
    };
    // This can be done with a update query....
    // // vote on a post (via post id)
    // public voteForPost(response: any, voteValue: Number, filter: Object) {
    //   var query = this.model.findOne(filter);
    //   query.totalVotes += voteValue;
    //   query.save();
    // }
    PostModel.prototype.updatePostDetails = function (response, postObject) {
    };
    // delete a post (via post id)
    // TODO: update user info by number of posts
    PostModel.prototype.deletePost = function (response, filter) {
        var query = this.model.deleteOne(filter);
        query.exec(function (err, post) {
            if (err) {
                console.log("Error deleting post.");
            }
        });
    };
    // get all comments (via post id)
    PostModel.prototype.getAllComments = function (response, filter) {
        var query = this.model.find({ postId: { filter: "postId" } });
        query.exec(function (err, post) {
            response.json(post);
        });
    };
    return PostModel;
}());
exports.PostModel = PostModel;
