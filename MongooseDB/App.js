"use strict";
exports.__esModule = true;
exports.App = void 0;
//import * as path from 'path';
var express = require("express");
var logger = require("morgan");
//import * as mongodb from 'mongodb';
//import * as url from 'url';
var bodyParser = require("body-parser");
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
        // #################################################
        // ##############  USERS METHODS    ################
        // #################################################
        //Create User
        router.post("/app/users/", function (req, res) {
            _this.User.createUser(res, req.body);
        });
        //Get User Details
        router.get("/app/users/:userId/", function (req, res) {
            _this.User.retrieveUserDetails(res, { userId: req.params.userId });
        });
        router.put("/app/users/", function (req, res) {
            _this.User.updateUserDetails(res, req.body);
        });
        router["delete"]("/app/users/", function (req, res) {
            _this.User.deleteUser(res, req.body);
            if (res.json["deletedCount"] == 0)
                return;
            var _userId = req.body["userId"];
            _this.Post.deletePost(res, { userId: _userId });
            _this.Comment.deleteComment(res, { commentId: _userId });
        });
        // #################################################
        // ##############  POSTS METHODS    ################
        // #################################################
        //create a post
        router.post("/app/posts/", function (req, res) {
            _this.Post.createPost(res, req.body);
        });
        //get individual post details by id
        router.get("/app/posts/:postId/", function (req, res) {
            _this.Post.retrievePostDetails(res, { postId: req.params.postId });
        });
        //load feed (get post by day)
        router.get("/app/posts/:day", function (req, res) {
            _this.Post.getFeed(res, { timePost: new Date(req.params.day) });
        });
        router.put("/app/posts/", function (req, res) {
            _this.Post.updatePostDetails(res, req.body);
        });
        router["delete"]("/app/posts/", function (req, res) {
            _this.Post.deletePost(res, req.body);
            if (res.json["deletedCount"] != 0)
                _this.Comment.deleteComment(res, { commentId: req.body["postId"] });
        });
        // #################################################
        // ##############  COMMENT METHODS    ################
        // #################################################
        router.post("/app/comments/", function (req, res) {
            _this.Comment.createComment(res, req.body);
        });
        router.get("/app/comments/", function (req, res) {
            _this.Comment.retrieveComment(res, req.body);
        });
        //get all comments on a post
        router.get("/app/post/comment/", function (req, res) {
            _this.Comment.retrieveComments(res, req.body);
        });
        router.put("/app/post/comments/", function (req, res) {
            console.log(req.body);
            _this.Comment.updateComment(res, req.body);
        });
        router["delete"]("/app/post/comments/", function (req, res) {
            _this.Comment.deleteComment(res, req.body);
        });
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/pages"));
    };
    return App;
}());
exports.App = App;
