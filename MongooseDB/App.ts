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
import { IMemeModel } from "./interfaces/IMemeModel";
import { ICommentModel } from "./interfaces/ICommentModel";
import { IVoteModel } from "./interfaces/IVoteModel";

import { UserModel } from "./model/UserModel";
import { MemeModel } from "./model/MemeModel";
import { CommentModel } from "./model/CommentModel";
import { VoteModel } from "./model/VoteModel";

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  //added these
  public User: UserModel;
  public Meme: MemeModel;
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
    this.Meme = new MemeModel();
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
    router.get("/app/users/:userId/", async (req, res) => {
      this.User.retrieveUserDetails(res, { userId: req.params.userId });
    });

    router.put("/app/users/", (req, res) => {
      this.User.updateUserDetails(res, req.body as IUserModel);
    });

    router.delete("/app/users/", (req, res) => {
      this.User.deleteUser(res, req.body as IUserModel);
      this.Meme.deleteMeme(res, { userId: req.body["userId"] });
      this.Comment.deleteComment(res, { commentId: req.body["userId"] });
    });

    // #################################################
    // ##############  memes METHODS    ################
    // #################################################

    //create a post
    router.post("/app/memes/", (req, res) => {
      this.Meme.createPost(res, req.body as IMemeModel);
    });

    //get individual post details by id
    router.get("/app/memes/:memeId/", async (req, res) => {
      this.Meme.retrieveMemeDetails(res, { memeId: req.params.memeId });
    });

    //load feed (get post by day)
    router.get("/app/memes/day/:day", (req, res) => {
      this.Meme.getFeed(res, { timePost: new Date(req.params.day) });
    });

    router.put("/app/memes/", (req, res) => {
      this.Meme.updatePostDetails(res, req.body as IMemeModel);
    });

    router.delete("/app/memes/", (req, res) => {
      this.Meme.deleteMeme(res, req.body as IMemeModel);
      this.Comment.deleteComment(res, { commentId: req.body["memeId"] });
    });

    // #################################################
    // ##############  COMMENT METHODS    ################
    // #################################################

    router.post("/app/comments/", (req, res) => {
      this.Comment.createComment(res, req.body as ICommentModel);
    });

    router.get("/app/comments/:commentId", async (req, res) => {
        this.Comment.retrieveComment(res, { commentId: req.params.commentId });
    });

    //get all comments on a post
    router.get("/app/memes/comment/:memeId", async (req, res) => {
      this.Comment.retrieveComments(res, { memeId: req.params.memeId });
      // this.Comment.retrieveComment(res, req.body as ICommentModel);
    });
    
    router.put("/app/memes/comments/", (req, res) => {
      this.Comment.updateComment(res, req.body as ICommentModel);
    });

    router.delete("/app/memes/comments/", (req, res) => {
      this.Comment.deleteComment(res, req.body as ICommentModel);
    });

    // #################################################
    // ##############  VOTE METHODS    #################
    // #################################################

    router.post("/app/memes/votes/", (req, res) => {
      this.Vote.createVote(res, req.body as IVoteModel);
    });

    router.delete("/app/memes/votes/", (req, res) => {
      this.Vote.deleteVote(res, req.body as IVoteModel);
    });

    this.expressApp.use("/", router);
    this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
    this.expressApp.use("/images", express.static(__dirname + "/img"));
    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
