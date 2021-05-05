// feed_id int
// day date
// cut(threshold: int)
// filter ?
var Feed = /** @class */ (function () {
    function Feed() {
        this.day = new Date();
        // TODO initialize feed_id 
    }
    Feed.prototype.cut = function () {
        // does this belong here or with post objects? 
    };
    return Feed;
}());
