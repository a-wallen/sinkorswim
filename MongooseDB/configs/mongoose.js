"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var ADMINS = {
    wallenstephe: "WMNUeZvP8zL8VIP0",
    ssheikh: "0sZvkQhy40adwPxk",
    outcaltk: "4NwFs2HdBRPIMbyY",
    larsonlaura: "nX0oolK6ReQ5X9Eu"
};
// SET YOUR THIS VARIABLE TO YOUR USERNAME
var dev_usr = "ssheikh";
var MONGO_USERNAME = process.env.MONGO_USERNAME || dev_usr;
var MONGO_PASSWORD = process.env.MONGO_PASSWORD || ADMINS[dev_usr];
var MONGO_HOST = process.env.MONGO_URL ||
    "mongodb+srv://soscluster.0r8jh.mongodb.net/dev?authSource=admin";
var MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};
var MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS
};
exports["default"] = MONGO;
