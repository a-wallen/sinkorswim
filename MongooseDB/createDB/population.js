"use strict";
exports.__esModule = true;
var fake = require("faker");
var UserModel_1 = require("../model/UserModel");
var PostModel_1 = require("../model/PostModel");
var CommentModel_1 = require("../model/CommentModel");
var FeedModel_1 = require("../model/FeedModel");
var SOSCollections;
(function (SOSCollections) {
    SOSCollections[SOSCollections["Users"] = 0] = "Users";
    SOSCollections[SOSCollections["Posts"] = 1] = "Posts";
    SOSCollections[SOSCollections["Comments"] = 2] = "Comments";
    SOSCollections[SOSCollections["Feeds"] = 3] = "Feeds";
})(SOSCollections || (SOSCollections = {}));
var SOSRemoteCollectionInstance = /** @class */ (function () {
    function SOSRemoteCollectionInstance() {
        this.Users = new UserModel_1.UserModel();
        this.Posts = new PostModel_1.PostModel();
        this.Comments = new CommentModel_1.CommentModel();
        this.Feeds = new FeedModel_1.FeedModel();
        this.RemoteCollectionGroup = [this.Users, this.Posts, this.Comments, this.Feeds];
    }
    return SOSRemoteCollectionInstance;
}());
;
var SOSDocumentGenerator = /** @class */ (function () {
    function SOSDocumentGenerator() {
        this.remotecollection = new SOSRemoteCollectionInstance();
        this.collectionGeneratorFunctions = [this.generateRandomUser, this.generateRandomPost, this.generateRandomComment, this.generateRandomFeed];
    }
    SOSDocumentGenerator.prototype.generateNDocuments = function (threshold, collection) {
        // generate random users
        for (var i = 0; i < threshold; i++) {
            this.remotecollection.RemoteCollectionGroup[collection].model.create(this.collectionGeneratorFunctions[collection](), function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
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
    SOSDocumentGenerator.prototype.generateRandomFeed = function () {
        return {
            feedId: fake.random.uuid(),
            date: fake.date.recent()
        };
    };
    return SOSDocumentGenerator;
}());
var Generator = new SOSDocumentGenerator();
Generator.generateNDocuments(10, SOSCollections.Feeds);
