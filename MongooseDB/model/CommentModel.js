"use strict";
exports.__esModule = true;
exports.CommentModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
/*
Comments model
CRUD
create: post a comment
read: view a comment
update: like a comment, edit a comment
delete: delete a comment
*/
var CommentModel = /** @class */ (function () {
    function CommentModel() {
        this.createSchema();
        this.createModel();
    }
    CommentModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            commentId: { type: String, required: true, index: { unique: true } },
            postId: { type: String, required: true },
            userId: { type: String, required: true },
            content: { type: String, required: true },
            timestamp: { type: String, required: true },
            likes: { type: Number }
        }, { collection: 'comments' });
    };
    CommentModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Comments", this.schema);
    };
    CommentModel.prototype.createComment = function (response, commentObject) {
        var operationSuccess = false;
        this.model.insertMany(commentObject)
            .then(function (result) {
            operationSuccess = true;
            response.json(result);
        })["catch"](function (err) {
            response.json(err);
        });
        return operationSuccess;
    };
    CommentModel.prototype.retrieveComment = function (commentObject) {
        return this.model.findOne({ commentId: commentObject["commentId"] });
    };
    // view a comment 
    CommentModel.prototype.retrieveComments = function (postObject) {
        return this.model.find({ postId: postObject["memeId"] });
    };
    CommentModel.prototype.updateComment = function (response, commentObject) {
        var operationSuccess = false;
        this.model.replaceOne({ commentId: commentObject["commentId"] }, commentObject)
            .then(function (result) {
            operationSuccess = true;
            response.json(result);
        })["catch"](function (err) {
            response.json(err);
        });
        return operationSuccess;
    };
    // delete a comment 
    CommentModel.prototype.deleteComment = function (response, commentObject) {
        var operationSuccess = false;
        this.model.deleteMany({ commentId: commentObject["commentId"] })
            .then(function (result) {
            operationSuccess = true;
            response.json(result);
        })["catch"](function (err) {
            response.json(err);
        });
        return operationSuccess;
    };
    return CommentModel;
}());
exports.CommentModel = CommentModel;
