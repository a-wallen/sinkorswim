import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: Number;
    userName: String;
    email: String;
    password: String;
    total_upvotes: Number;
    swimmingPosts: Number;
    sinkingPosts: Number;
    reports: Number
}
export {IUserModel};
