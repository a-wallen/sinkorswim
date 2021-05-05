//import * as path from 'path';
import * as express from "express";
import * as logger from "morgan";
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from "body-parser";
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import { DataAccess } from "./DataAccess";
import { FeedModel } from "./model/FeedModel";
import { UserModel } from "./model/UserModel";
import { PostModel } from "./model/PostModel";
import { CommentModel } from "./model/CommentModel";

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  //added these
  public User: UserModel;
  public Post: PostModel;
  public Comment: CommentModel;
  public Feed: FeedModel;

  public idGenerator: number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 102;
  
    //added these
    this.User = new UserModel();
    this.Comment = new CommentModel();
    this.Post = new PostModel();
    this.Feed = new FeedModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger("dev"));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.

  private routes(): void {
    let router = express.Router();

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
    router.post("/app/user/", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      //jsonObj.listId = this.idGenerator;
      this.User.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });

      //TODO - Potentially change this later? Use Mongo built in?
      res.send(this.idGenerator.toString());
      this.idGenerator++;
    });

    //Get User Details
    router.get("/app/user/:userId/", (req, res) => {
      var id = req.params.userId;
      console.log("Query User with id: " + id);
      this.User.retrieveUserDetails(res, { userId: id });
    });

    //create a post
    router.post("/app/post/", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      //jsonObj.listId = this.idGenerator;
      this.Post.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });

      //TODO - Potentially change this later? Use Mongo built in?
      res.send(this.idGenerator.toString());
      this.idGenerator++;
    });

    //get post
    router.get("/app/post/:postId/", (req, res) => {
      var id = req.params.postId;
      console.log("Query post with id: " + id);
      this.Post.retrievePost(res, { postId: id });
    });

    //get all comments on a post
    router.get("/app/post/comments/:postId/", (req, res) => {
      var id = req.params.postId;
      console.log("Query all comments with post id: " + id);
      this.Post.getAllComments(res, { postId: id });
    });

    //create a comment
    router.post("/app/comment/", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      //jsonObj.listId = this.idGenerator;
      this.Comment.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });

      //TODO - Potentially change this later? Use Mongo built in?
      res.send(this.idGenerator.toString());
      this.idGenerator++;
    });

    //get post
    router.get("/app/comment/:commentId/", (req, res) => {
      var id = req.params.commentId;
      console.log("Query comment with id: " + id);
      this.Comment.retrieveComment(res, { commentId: id });
    });

    router.get("/app/feed/:feedId/", (req, res) => {
      var f_id = req.params.feedId;
      console.log("Query comment with id: " + f_id);
      this.Feed.retrieveFeed(res, {feedId: f_id}, 1);
    });

    router.get("/app/feed/:start:end", (req, res) => {
      var start:number = parseInt(req.params.start);
      var end:number = parseInt(req.params.end);
      console.log(start);
      console.log(end);
      this.Feed.retrieveFeed(res, {}, (end-start));
      res.send(res);
    });

    this.expressApp.use("/", router);

    this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
    this.expressApp.use("/images", express.static(__dirname + "/img"));
    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
