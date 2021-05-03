"use strict";
exports.__esModule = true;
var fake = require("faker");
var UserModel_1 = require("../model/UserModel");
var PostModel_1 = require("../model/PostModel");
var CommentModel_1 = require("../model/CommentModel");
var GENERATOR_THRESHOLD = 100;
var random = {
    userId: fake.datatype.number(),
    userName: fake.random.word(),
    email: fake.random.word(),
    password: fake.random.word(),
    total_upvotes: fake.datatype.number(),
    swimmingPosts: fake.datatype.number(),
    sinkingPosts: fake.datatype.number(),
    reports: fake.datatype.number()
};
var SOSRemoteCollections = /** @class */ (function () {
    function SOSRemoteCollections() {
        this.Users = new UserModel_1.UserModel();
        this.Posts = new PostModel_1.PostModel();
        this.Comments = new CommentModel_1.CommentModel();
    }
    return SOSRemoteCollections;
}());
;
var SOSDocumentGenerator = /** @class */ (function () {
    function SOSDocumentGenerator() {
    }
    SOSDocumentGenerator.prototype.makeUser = function () {
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
    SOSDocumentGenerator.prototype.makePost = function () {
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
    SOSDocumentGenerator.prototype.makeComment = function () {
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
var RemoteCollectionsInstance = new SOSRemoteCollections();
var Generator = new SOSDocumentGenerator();
// generate random users
for (var i = 0; i < GENERATOR_THRESHOLD; i++) {
    RemoteCollectionsInstance.Users.model.create(Generator.makeUser(), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
// generate random posts
for (var i = 0; i < GENERATOR_THRESHOLD; i++) {
    RemoteCollectionsInstance.Posts.model.create(Generator.makePost(), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
// generate random comments
for (var i = 0; i < GENERATOR_THRESHOLD; i++) {
    RemoteCollectionsInstance.Comments.model.create(Generator.makeComment(), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
