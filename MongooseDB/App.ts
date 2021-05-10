//import * as path from 'path';
import * as express from "express";
import * as logger from "morgan";
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from "body-parser";
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
import { DataAccess } from "./DataAccess";

import { IUserModel } from "./interfaces/IUserModel";
import { IPostModel } from "./interfaces/IPostModel"
import { ICommentModel } from "./interfaces/ICommentModel";
import { IVoteModel } from "./interfaces/IVoteModel"; 

import { UserModel } from "./model/UserModel";
import { PostModel } from "./model/PostModel";
import { CommentModel } from "./model/CommentModel";
import { VoteModel } from "./model/VoteModel"; 

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  //added these
  public User: UserModel;
  public Post: PostModel;
  public Comment: CommentModel;
  public Vote: VoteModel; 

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
    this.Vote = new VoteModel(); 
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

    // #################################################
    // ##############  USERS METHODS    ################
    // #################################################
    
    //Create User
    router.post("/app/users/", (req, res) => {
      this.User.createUser(res, req.body as IUserModel);
    });

    //Get User Details
    router.get("/app/users/:userId/", (req, res) => {
      this.User.retrieveUserDetails(res, { userId: req.params.userId});
    });

    router.put("/app/users/", (req, res) => {
      this.User.updateUserDetails(res, req.body as IUserModel);
    });

    router.delete("/app/users/", (req, res) => {
      this.User.deleteUser(res, req.body as IUserModel);
      if(res.json["deletedCount"] == 0) return;
      let _userId = req.body["userId"];
      this.Post.deletePost(res, {userId: _userId});
      this.Comment.deleteComment(res, {commentId: _userId});
    });

    // #################################################
    // ##############  POSTS METHODS    ################
    // #################################################

    //create a post
    router.post("/app/posts/", (req, res) => {
      this.Post.createPost(res, req.body as IPostModel);
    });

    //get individual post details by id
    router.get("/app/posts/:postId/", (req, res) => {
      this.Post.retrievePostDetails(res, { postId: req.params.postId });
    });

    //load feed (get post by day)
    router.get("/app/posts/:day", (req, res) => {
      this.Post.getFeed(res, { timePost: new Date(req.params.day) });
    });

    router.put("/app/posts/", (req, res) => {
      this.Post.updatePostDetails(res, req.body as IPostModel);
    })

    router.delete("/app/posts/", (req, res) => {
      this.Post.deletePost(res, req.body as IPostModel);
      if(res.json["deletedCount"] != 0)
        this.Comment.deleteComment(res, {commentId: req.body["postId"]});
    });
    
    // #################################################
    // ##############  COMMENT METHODS    ################
    // #################################################
    
    router.post("/app/comments/", (req, res) => {
      this.Comment.createComment(res, req.body as ICommentModel);
    });

    router.get("/app/comments/", (req, res) => {
      this.Comment.retrieveComment(res, req.body as ICommentModel);
    });

    //get all comments on a post
    router.get("/app/post/comment/", (req, res) => {
      this.Comment.retrieveComments(res, req.body as IPostModel);
    });

    router.put("/app/post/comments/", (req, res) => {
      this.Comment.updateComment(res, req.body as ICommentModel);
    })

    router.delete("/app/post/comments/", (req, res) => {
      this.Comment.deleteComment(res, req.body as ICommentModel);
    })

    // #################################################
    // ##############  VOTE METHODS    #################
    // #################################################

    router.post("/app/post/votes/", (req, res) => {
      this.Vote.createVote(res, req.body as IVoteModel); 
    })

    router.delete("/app/post/votes/", (req, res) => {
      this.Vote.deleteVote(res, req.body as IVoteModel); 
    })


    this.expressApp.use("/", router);
    this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
    this.expressApp.use("/images", express.static(__dirname + "/img"));
    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
