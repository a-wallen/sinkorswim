"use strict";
exports.__esModule = true;
exports.App = void 0;
//import * as path from 'path';
var express = require("express");
var logger = require("morgan");
//import * as mongodb from 'mongodb';
//import * as url from 'url';
var bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var ListModel_1 = require("./model/ListModel");
var TaskModel_1 = require("./model/TaskModel");
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
        this.Lists = new ListModel_1.ListModel();
        this.Tasks = new TaskModel_1.TaskModel();
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
        //get all comments on a post
        router.get("/app/post/comments/:postId/", function (req, res) {
            var id = req.params.postId;
            console.log("Query all comments with post id: " + id);
            _this.Post.getAllComments(res, { postId: id });
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
        //get post
        router.get("/app/comment/:commentId/", function (req, res) {
            var id = req.params.commentId;
            console.log("Query comment with id: " + id);
            _this.Comment.retrieveComment(res, { commentId: id });
        });
        router.post("/app/list/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.listId = this.idGenerator;
            _this.Lists.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router.get("/app/list/:listId", function (req, res) {
            var id = req.params.listId;
            console.log("Query single list with id: " + id);
            _this.Tasks.retrieveTasksDetails(res, { listId: id });
        });
        router.get('/app/helloworld', function (req, res) {
            var data = { listId: 123,
                tasks: [{
                        description: "Hello",
                        taskId: 1,
                        shared: "Hello",
                        status: "Hello"
                    }] };
            // this.[CollectionName].model.method( param1, param.... () => {
            // })
            _this.Tasks.model.create([data], function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.send(data);
        });
        router.get('/app/list/', function (req, res) {
            console.log('Query All list');
            _this.Lists.retrieveAllLists(res);
        });
        router.get("/app/listcount", function (req, res) {
            console.log("Query the number of list elements in db");
            _this.Lists.retrieveListCount(res);
        });
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/pages"));
    };
    return App;
}());
exports.App = App;
