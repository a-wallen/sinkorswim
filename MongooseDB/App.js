"use strict";
exports.__esModule = true;
exports.App = void 0;
//import * as path from 'path';
var express = require("express");
var logger = require("morgan");
//import * as mongodb from 'mongodb';
//import * as url from 'url';
var bodyParser = require("body-parser");
var FeedModel_1 = require("./model/FeedModel");
var UserModel_1 = require("./model/UserModel");
var PostModel_1 = require("./model/PostModel");
var CommentModel_1 = require("./model/CommentModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        //added these
        this.User = new UserModel_1.UserModel();
        this.Comment = new CommentModel_1.CommentModel();
        this.Post = new PostModel_1.PostModel();
        this.Feed = new FeedModel_1.FeedModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        //What do we need
        /*
        Create User
        Get User
        Authentication
        Create Post
        Get Post
        Delete Post
        Upvote
        Downvote
        get feed
        create comment
        update comment
        delete comment
        
        */
        //Create User
        router.post("/app/user/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.listId = this.idGenerator;
            _this.User.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            //TODO - Potentially change this later? Use Mongo built in?
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        //Get User Details
        router.get("/app/user/:userId/", function (req, res) {
            var id = req.params.userId;
            console.log("Query User with id: " + id);
            _this.User.retrieveUserDetails(res, { userId: id });
        });
        //create a post
        router.post("/app/post/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.listId = this.idGenerator;
            _this.Post.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            //TODO - Potentially change this later? Use Mongo built in?
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        //get post
        router.get("/app/post/:postId/", function (req, res) {
            var id = req.params.postId;
            console.log("Query post with id: " + id);
            _this.Post.retrievePost(res, { postId: id });
        });
        // update a post (caption)
        router.put("/app/post/:postId/", function (req, res) {
            var id = req.params.postId;
            console.log("Updating a post with an id of: " + id);
            _this.Post.updatePost(res, { postId: id });
        });
        // delete a post
        router["delete"]("/app/post/:postId/", function (req, res) {
            var id = req.params.postId;
            console.log("Deleting a post with id of + " + id);
            _this.Post.deletePost(res, { postId: id });
        });
        //get all comments on a post
        router.get("/app/post/comments/:postId/", function (req, res) {
            var id = req.params.postId;
            console.log("Query all comments with post id: " + id);
            _this.Comment.getAllComments(res, { postId: id });
        });
        //create a comment
        router.post("/app/comment/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.listId = this.idGenerator;
            _this.Comment.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            //TODO - Potentially change this later? Use Mongo built in?
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        //get comment
        router.get("/app/comment/:commentId/", function (req, res) {
            var id = req.params.commentId;
            console.log("Query comment with id: " + id);
            _this.Comment.retrieveComment(res, { commentId: id });
        });
        router.get("/app/feed/:feedId/", function (req, res) {
            var f_id = req.params.feedId;
            console.log("Query comment with id: " + f_id);
            _this.Feed.retrieveFeed(res, { feedId: f_id }, 1);
        });
        router.get("/app/feed/:start:end", function (req, res) {
            var start = parseInt(req.params.start);
            var end = parseInt(req.params.end);
            console.log(start);
            console.log(end);
            _this.Feed.retrieveFeed(res, {}, end - start);
            res.send(res);
        });
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/pages"));
    };
    return App;
}());
exports.App = App;
