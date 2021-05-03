"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var logger = require("morgan");
var url = require("url");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.mongoDBConnection = 'mongodb://dbAdmin/test@localhost:3000/classSample';
        this.dbConnection = null;
        this.expressApp = express();
        this.middleware();
        this.openDbConnection();
        this.routes();
    }
    App.prototype.openDbConnection = function () {
        var _this = this;
        if (this.dbConnection == null) {
            MongoClient.connect(this.mongoDBConnection, function (err, dbConnection) {
                _this.dbConnection = dbConnection;
                console.log("Connected correctly to MongoDB server.");
            });
        }
    };
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.accessTransportation = function (res, payload, api) {
        var deferred = Q.defer();
        console.log("query Transportation");
        if (this.dbConnection != null) {
            console.log("Using Connection");
            this.dbConnection.collection('carCollection2', function (err, nCollection) {
                var query = payload;
                if (api == "query") {
                    nCollection.find(query, function (err, cursor) {
                        cursor.toArray(function (err, itemArray) {
                            /*                    var list = "<h1>Request</h1>";
                                              for (var i = 0; i < itemArray.length; i++) {
                                                  list += "<h3>" + itemArray[i].vehicle + " : " + itemArray[i].speed + "mph</h3>";
                                              }
                            */
                            var list = JSON.stringify(itemArray);
                            return deferred.resolve(list);
                        });
                    });
                }
                else if (api == "insert") {
                    console.log("inserting payload:" + payload);
                    nCollection.insert(payload);
                    return deferred.resolve({ "result": "added" });
                }
                else if (api == "delete") {
                    console.log("deleting payload:" + payload.toString());
                    nCollection.deleteOne(payload, function (err2, obj) {
                        if (err2) {
                            res.statusCode = 400;
                            return deferred.resolve({ "result": "error deleting" });
                        }
                        // n in results indicates the number of records deleted
                        if (obj.result.n == 0) {
                            res.statusCode = 400;
                            //res.send("delete : record not found");
                            return deferred.resolve({ "delete": "record not found" });
                        }
                        else {
                            res.statusCode = 200;
                            return deferred.resolve({ "result": "deleted" });
                        }
                    });
                }
            });
            console.log("Making Async Call to retrieve Collection: carCollection");
        }
        else {
            console.log("Connection lost");
        }
        return deferred.promise;
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/all', function (req, res) {
            _this.accessTransportation(res, {}, "query").then(function (list) { res.send(list); });
        });
        router.post('/add', function (req, res) {
            var bodyRequest = req.body;
            _this.accessTransportation(res, bodyRequest, "insert").then(function (result) { res.send(result); });
        });
        router["delete"]('/remove', function (req, res) {
            var bodyRequest = req.body;
            _this.accessTransportation(res, bodyRequest, "delete").then(function (result) { res.send(result); });
        });
        router.get('/search', function (req, res) {
            var urlParts = url.parse(req.url, true);
            var query = urlParts.query;
            var msg = 'search for ' + query.var1;
            console.log(msg);
            _this.accessTransportation(res, { speed: query.var1 }, "query").then(function (list) {
                res.send(list);
            });
        });
        router.get('/vehicle/:vname', function (req, res) {
            var vname = req.param('vname');
            console.log('Query for vehicle name: ' + vname);
            _this.accessTransportation(res, { vehicle: vname }, "query").then(function (list) {
                res.send(list);
            });
        });
        router.param('vname', function (req, res, next, value) {
            console.log('The param value is: ' + value);
            next();
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
