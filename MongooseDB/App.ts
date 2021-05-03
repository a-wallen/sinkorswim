//import * as path from 'path';
import * as express from "express";
import * as logger from "morgan";
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from "body-parser";
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import { ListModel } from "./model/ListModel";
import { TaskModel } from "./model/TaskModel";
import { DataAccess } from "./DataAccess";
import { UserModel } from "./model/UserModel";
import { PostModel } from "./model/PostModel";
import { CommentModel } from "./model/CommentModel";

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public Lists: ListModel;
  //added these
  public User: UserModel;
  public Post: PostModel;
  public Comment: CommentModel;

  public Tasks: TaskModel;
  public idGenerator: number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 102;
    this.Lists = new ListModel();
    this.Tasks = new TaskModel();

    //added these
    this.User = new UserModel();
    this.Comment = new CommentModel();
    this.Post = new PostModel();
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

    router.post("/app/list/", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      //jsonObj.listId = this.idGenerator;
      this.Lists.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });
      res.send(this.idGenerator.toString());
      this.idGenerator++;
    });

    router.get("/app/list/:listId", (req, res) => {
      var id = req.params.listId;
      console.log("Query single list with id: " + id);
      this.Tasks.retrieveTasksDetails(res, { listId: id });
    });

    router.get("/app/list/", (req, res) => {
      console.log("Query All list");
      this.Lists.retrieveAllLists(res);
    });

    router.get("/app/listcount", (req, res) => {
      console.log("Query the number of list elements in db");
      this.Lists.retrieveListCount(res);
    });

    this.expressApp.use("/", router);

    this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
    this.expressApp.use("/images", express.static(__dirname + "/img"));
    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
