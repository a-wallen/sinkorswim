import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: String;
    userName: String;
    email: String;
    password: String;
    avatar_url: String;
    total_upvotes: Number;
    swimmingPosts: Number;
    sinkingPosts: Number;
    reports: Number
}
export {IUserModel};
