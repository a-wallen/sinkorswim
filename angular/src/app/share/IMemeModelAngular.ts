interface IMemeModelAngular {
  memeId: String;
  userId: String;
  feedId: String;
  totalVotes: Number;
  caption: String;
  timePost: Date;
  imageUrl: String; // FIXME: how to format
  reports: Number;
}
export default IMemeModelAngular;
