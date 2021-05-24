import Mongoose = require("mongoose");

interface IMemeModel extends Mongoose.Document {
  memeId: String;
  userId: String;
  feedId: String;
  totalVotes: Number;
  caption: String;
  timePost: Date;
  imageUrl: String; // FIXME: how to format
  reports: Number;
}
export { IMemeModel };
