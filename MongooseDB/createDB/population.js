"use strict";
exports.__esModule = true;
var fake = require("faker");
var UserModel_1 = require("../model/UserModel");
var PostModel_1 = require("../model/PostModel");
var CommentModel_1 = require("../model/CommentModel");
var SOSRemoteCollectionInstance = /** @class */ (function () {
    function SOSRemoteCollectionInstance() {
        this.Users = new UserModel_1.UserModel();
        this.Posts = new PostModel_1.PostModel();
        this.Comments = new CommentModel_1.CommentModel();
        this.RemoteCollectionGroup = [this.Users, this.Posts, this.Comments];
    }
    return SOSRemoteCollectionInstance;
}());
;
var SOSDocumentGenerator = /** @class */ (function () {
    function SOSDocumentGenerator() {
        this.remotecollection = new SOSRemoteCollectionInstance();
    }
    SOSDocumentGenerator.prototype.generateUserFootprints = function (amount) {
        var _this = this;
        var _userDocs = [];
        var _userPostDocs = [];
        var _userCommentDocs = [];
        for (var i = 0; i < amount; i++) {
            var _currentUser = this.generateRandomUser();
            _userDocs.push(_currentUser);
            for (var j = 0; j < amount; j++) {
                var _userPost = this.generateRandomPost();
                _userPost["userId"] = _currentUser["userId"];
                _userPostDocs.push(_userPost);
                for (var k = 0; k < amount; k++) {
                    var _userComment = this.generateRandomComment();
                    _userComment["userId"] = _currentUser["userId"];
                    _userComment["postId"] = _userPost["postId"];
                    _userCommentDocs.push(_userComment);
                }
            }
        }
        _userDocs.forEach(function (document) {
            _this.remotecollection.Users.model.create(document, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
        _userPostDocs.forEach(function (document) {
            _this.remotecollection.Posts.model.create(document, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
        _userCommentDocs.forEach(function (document) {
            _this.remotecollection.Comments.model.create(document, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    };
    SOSDocumentGenerator.prototype.generateRandomUser = function () {
        var firstName = fake.name.firstName();
        var lastName = fake.name.lastName();
        return {
            userId: fake.random.uuid(),
            userName: firstName + fake.random.word() + lastName + fake.datatype.number(),
            email: lastName + firstName + '@gmail.com',
            password: fake.random.word() + fake.datatype.number(),
            total_upvotes: fake.datatype.number(),
            swimmingPosts: fake.datatype.number(),
            sinkingPosts: fake.datatype.number(),
            reports: fake.datatype.number()
        };
    };
    SOSDocumentGenerator.prototype.generateRandomPost = function () {
        return {
            postId: fake.random.uuid(),
            userId: fake.random.uuid(),
            feedId: fake.random.uuid(),
            totalVotes: fake.datatype.number(),
            caption: fake.random.words(10),
            timePost: fake.date.recent(),
            imageUrl: fake.random.words(6),
            reports: fake.datatype.number()
        };
    };
    SOSDocumentGenerator.prototype.generateRandomComment = function () {
        return {
            postId: fake.random.uuid(),
            userId: fake.random.uuid(),
            commentId: fake.datatype.number(),
            content: fake.random.words(10),
            likes: fake.datatype.number(),
            timestamp: fake.date.recent()
        };
    };
    return SOSDocumentGenerator;
}());
var Generator = new SOSDocumentGenerator();
Generator.generateUserFootprints(3);
