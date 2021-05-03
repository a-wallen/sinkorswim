"use strict";
exports.__esModule = true;
var fake = require("faker");
var UserModel_1 = require("../model/UserModel");
var PostModel_1 = require("../model/PostModel");
var CommentModel_1 = require("../model/CommentModel");
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
var SOSDataGenerator = /** @class */ (function () {
    function SOSDataGenerator() {
        this.Users = new UserModel_1.UserModel();
        this.Posts = new PostModel_1.PostModel();
        this.Comments = new CommentModel_1.CommentModel();
    }
    return SOSDataGenerator;
}());
;
var Generator = new SOSDataGenerator();
Generator.Users.model.create(random, function (err) {
    if (err) {
        console.log(err);
    }
});
