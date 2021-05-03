"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
/* Methods to add:
CRUD
create a new user
get user info (via id)
update user information: update username, update email, update password,
update user activity: totalUpvotes, swimmingPosts, sinkingPosts, reports
delete: delete a user
 */
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: String,
            userName: String,
            password: String,
            email: String,
            totalUpvotes: Number,
            swimmingPosts: Number,
            sinkingPosts: Number,
            reports: Number
        }, { collection: 'users' });
    };
    // create a user
    UserModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("User", this.schema);
    };
    // get user details
    UserModel.prototype.retrieveUserDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, userDetails) {
            response.json(userDetails);
        });
    };
    UserModel.prototype.saveUser = function (userObj) {
        console.log(userObj);
        //var query = this.model.save(userObj);
    };
    return UserModel;
}());
exports.UserModel = UserModel;
