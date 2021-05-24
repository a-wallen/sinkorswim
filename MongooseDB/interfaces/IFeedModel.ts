import Mongoose = require("mongoose");

interface IFeedModel extends Mongoose.Document {
    feedId: String; 
    date: Date; 
}
export {IFeedModel};
