"use strict";
exports.__esModule = true;
exports.FeedModel = void 0;
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
var FeedModel = /** @class */ (function () {
    function FeedModel() {
        this.createSchema();
        this.createModel();
    }
    FeedModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            feedId: { type: String, required: true, index: { unique: true } },
            date: { type: String, required: true }
        }, { collection: "feeds" });
    };
    FeedModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Feed", this.schema);
    };
    FeedModel.prototype.createFeed = function (response, feedObj) {
        var _this = this;
        var query = this.model.create(feedObj, function (err) { return _this.errorHandler(err); });
        query.exec(function (feedObj, err) {
            response.json(feedObj);
        });
    };
    // get a post (via post id)
    FeedModel.prototype.retrieveFeed = function (response, filter, limit) {
        var query = this.model.find(filter).limit(limit);
        query.exec(function (err, feed) {
            response.json(feed);
        });
    };
    // delete a post (via post id)
    // TODO: update user info by number of posts
    FeedModel.prototype.deleteFeed = function (response, filter) {
        var query = this.model.deleteOne(filter);
        query.exec(function (err, post) {
            if (err) {
                console.log("Error deleting post.");
            }
        });
    };
    // get all comments (via post id)
    FeedModel.prototype.getAllFeeds = function (response, filter) {
        var query = this.model.find({ postId: { filter: "postId" } });
        query.exec(function (err, post) {
            response.json(post);
        });
    };
    FeedModel.prototype.errorHandler = function (error) {
    };
    return FeedModel;
}());
exports.FeedModel = FeedModel;
